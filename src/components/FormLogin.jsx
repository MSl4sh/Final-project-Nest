import { useState } from "react"
import { NavLink } from 'react-router-dom';

const FormLogin = ({handleClick, visible }) =>
        {
            const [email, setEmail] = useState("")
            const [password, setPassword] = useState("") 
            
            const submit = (e) => {
                e.preventDefault()
                console.log(email)
                console.log(password)
                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'email': email,
                        'password': password
                    })
                })
            }

            return (visible && <form onSubmit={submit} className='z-50 flex flex-col bg-formBackground w-72 absolute top-20 right-0 p-8 rounded-xl border-2 border-midGreen mr-20'>
            <label htmlFor="email" className='px-2 mb-1'>E-mail<sup className="text-red-500 font-medium ml-0.5">*</sup></label>
            <input id="email" name="email" type="email" className='input opacity-100 focus:ring-transparent focus:outline-none px-4 mb-5 required' value={email} onChange={(e) =>setEmail(e.target.value)}/>
            <label htmlFor="password" className='px-2 mb-1'>Mot de passe<sup className="text-red-500 font-medium ml-0.5">*</sup></label>
            
            <input id="password" name="password" type="password" className='input opacity-100 focus:ring-transparent focus:outline-none px-4 mb-5 required'  value={password} onChange={(e) =>setPassword(e.target.value)}/>
            
            <NavLink className='hover:bg-darkGreen cursor-pointer bg-midGreen text-white rounded-lg font-medium py-3 mb-3 text-center' to="/utilisateur"><button type="submit">Se connecter</button></NavLink>
            
            <button type="button" className='cursor-pointer text-midGreen font-medium underline text-sm' onClick={handleClick}>Pas de Compte ? Inscrivez vous !</button>
        </form>)
        }

export default FormLogin