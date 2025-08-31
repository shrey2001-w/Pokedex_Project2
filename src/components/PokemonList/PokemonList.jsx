import { useEffect, useState } from "react";
import axios from 'axios' ;
import './PokemonList.css' ;
import { FaLeaf } from "react-icons/fa6";
import Pokemon from "../Pokemon/Pokemon";


function PokemonList (){
    // const [PokemonList , setPokemonList] = useState([]);
    // const [isLoading , setisLoading] = useState(true);


    // const [pokedexUrl , setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    // const [nextUrl , setNextUrl] = useState('');
    // const [prevUrl , setPrevUrl] = useState('');



    const [pokemonListState , setPokemonListState ] = useState({
        pokemonList : [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon' ,
        nextUrl: '',
        prevUrl: ''
    });
    

    async function downloadPokemons(){
       setPokemonListState((state) => ({...state , isLoading: true}));
        const response = await axios.get(pokemonListState.pokedexUrl);
        const pokemonResults = response.data.results;
        
        setPokemonListState((state) => ({...state,
             nextUrl:response.data.next ,
              prevUrl: response.data.previous
            }));
      

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
        setPokemonListState((state) => ({...state,
             pokemonList:res ,
              isLoading: false }));
        
    }
   



    useEffect(() =>{
        downloadPokemons();
    }, [pokemonListState.pokedexUrl]);


   





    return (
       <div className="pokemon-list-wrapper"> 
       
       <div className="pokemon-wrapper">

       {(pokemonListState.isLoading) ? 'Loading...' : 
          pokemonListState.pokemonList.map((p) =>  <Pokemon  name={p.name} image={p.image} key={p.id} id={p.id}/>)
         }


       </div>
       <div className="controls">
        <button disabled={pokemonListState.prevUrl == undefined}  onClick={() => setPokemonListState({...pokemonListState, pokedexUrl: pokemonListState.prevUrl})}> Prev </button>
        <button disabled={pokemonListState.nextUrl == undefined } onClick={() => setPokemonListState({...pokemonListState, pokedexUrl: pokemonListState.nextUrl})}> Next </button>
       </div>
     
       
       </div>
    )






}
export default PokemonList ;