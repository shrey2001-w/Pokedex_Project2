import { useEffect, useState } from "react";
import axios from 'axios' ;
import './PokemonList.css' ;
import { FaLeaf } from "react-icons/fa6";
import Pokemon from "../Pokemon/Pokemon";


function PokemonList (){
    const [PokemonList , setPokemonList] = useState([]);
    const [isLoading , setisLoading] = useState(true);


    const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon'

    async function downloadPokemons(){
        const response = await axios.get(POKEDEX_URL);
        const pokemonResults = response.data.results;
        console.log(response.data)

        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonResultPromise);
        console.log(pokemonData);
        const res = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {

            
                id: pokemon.id,
                name: pokemon.name ,
                image: (pokemon.sprites.other) ? pokemon.sprites.other .dream_world.front_default : pokemon.sprites.front_shiny ,
                types: pokemon.types
            }
        });
        console.log(res);
        setPokemonList(res);
        setisLoading(false);
    }
   



    useEffect(() =>{
        downloadPokemons();
    }, []);


   





    return (
       <div className="pokemon-list-wrapper"> 
       <div> Pokemon List </div>
       {(isLoading) ? 'Loading...' : 
          PokemonList.map((p) =>  <Pokemon  name={p.name} image={p.image} key={p.id}/>)
         }
       
       </div>
    )






}
export default PokemonList ;