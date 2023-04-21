import { useState } from "react"
import { NavLink } from 'react-router-dom';

const FormLogin = ({handleClick, visible }) =>
        {
            const [formData, setFormData] = useState({
                email: "",
                password: "",
              });

            const [errors, setErrors] = useState({})

            const handleChange = (e) => {
                const { name, value } = e.target;
                setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
            };
            
            const validateRequiredField = (fieldValue) => {
                if (!fieldValue) {
                  return `Ce champ est obligatoire.`;
                }
                return "";
            }

            const validateEmail = (fieldValue) => {
                if (fieldValue && !/^([\w-\.]+@([\w-]+\.)+[\w-]{2,})?$/.test(fieldValue)) {
                  return `Le format de votre email n'est pas correct`;
                }
                return "";
            }

            const validateForm = () => {
                const newErrors = {};

                newErrors.email = validateRequiredField(formData.email);
                newErrors.password = validateRequiredField(formData.password);
                newErrors.email += validateEmail(formData.email);

                return newErrors
            }

            const submit = (e) => {
                e.preventDefault()

                const newErrors = validateForm();

                if(Object.keys(newErrors).length > 0){
                    setErrors(newErrors);
                }else{
                    setFormData({
                            email: "",
                            password: "",
                          });
                }
            }

            return (visible && <form onSubmit={submit} className='z-50 flex flex-col bg-formBackground w-72 absolute top-20 right-0 p-8 rounded-xl border-2 border-midGreen mr-20'>
            <div className="flex flex-col gap-1">
                <label htmlFor="email" className='px-2'>E-mail<sup className="text-red-500 font-medium ml-0.5">*</sup></label>
                <input id="email" type="text" name="email" value={formData.email} className='input opacity-100 focus:ring-transparent focus:outline-none px-4 mb-5 required' onChange={handleChange }/>
                {errors.email && (
                <div className="text-red-500 text-sm ml-2 mt-1 w-full">{errors.surname}</div>
                )}
            </div>

            <div className="flex flex-col gap-1 mb-5">
                <label htmlFor="password" className='px-2'>Mot de passe<sup className="text-red-500 font-medium ml-0.5">*</sup></label>
                <input id="password" name="password" value={formData.password} type="password" className='input opacity-100 focus:ring-transparent focus:outline-none px-4 mb-5 required' onChange={handleChange}/>
                {errors.password && (
                <div className="text-red-500 text-sm ml-2 mt-1 w-full">{errors.surname}</div>
                )}
            </div>
            
            <NavLink to="/utilisateur" className={({isActive}) => (isActive ? 'border-none' : 'border-none')}><button type="submit" className='hover:bg-darkGreen cursor-pointer bg-midGreen text-white rounded-lg font-medium py-3 mb-3 text-center w-full'>Se connecter</button></NavLink>
            
            <button type="button" className='cursor-pointer text-midGreen font-medium underline text-sm' onClick={handleClick}>Pas de Compte ? Inscrivez vous !</button>
        </form>)
        }

export default FormLogin