import { useParams, NavLink } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from "../contexts/AuthContext";
import CabinComment from '../components/CabinComment';
import Carroussel from '../components/Carroussel';
import CommentForm from '../components/CommentForm';
import { format } from 'date-fns';

const Cabin = () => {

    const [currentUser, setCurrentUser] = useContext(AuthContext);
    const { id } = useParams();
    const [data, setData] = useState(["coucou"]);
    const [openedModal, setOpenedModal] = useState(false)
    const [isConnected, setIsConnected] = useState(false)
    const [openedCommentForm, setOpenedCommentForm] = useState(false)
    const today = new Date();
    const [minDate, setMinDate] = useState(today.toISOString().slice(0, 10));
    const [commentPosted, setCommentPosted] = useState(false)
    const [dateStart, setDateStart] = useState();
    const [dateEnd, setDateEnd] = useState();

    useEffect(() => {
        if (currentUser) {
            setIsConnected(true)
        } else {
            setIsConnected(false)
        }

    }, [currentUser]);



    function modalControl() {
        setOpenedModal(!openedModal)
    }

    function commentFormControl() {
        setOpenedCommentForm(!openedCommentForm)

    }

    async function fetchData() {
        const response = await fetch(`http://localhost:3000/cabins/${id}`);
        const Data = await response.json();
        console.log(id)
        return Data;
    }

    useEffect(() => {
        async function getData() {
            const result = await fetchData();
            setData(result);
        }
        getData();

    }, [commentPosted]);

    const changeCommentState = () => {
        setCommentPosted(!commentPosted)
        console.log(commentPosted)
    }

    const getDates = (e) => {
        if(e.target.id === "dateStart") {
            setDateStart(format(new Date(e.target.value), "dd, MM, yyyy"));
            console.log(dateStart);
        }
        if(e.target.id === "dateEnd") {
            setDateEnd(e.target.value)
        }
    }


    return (
        data && data.images ? (
            <div className="bg-backgroundColor max-h-fit pl-56 pr-56 pt-24 pb-24 gap-16 flex justify-between" >

                {openedModal ?
                    <div className='flex flex-col items-center w-full gap-4'>
                        <Carroussel images={data.images} />
                        <button type='button' onClick={modalControl} className='font-bold text-midGreen underline'>Retourner à la page de la cabane</button>
                    </div>
                    :
                    <>
                        <div className='w-3/4 mb-24 px-8'>
                            <div className='w-full h-[500px] mb-8 '>
                                <button type='button' className='h-full' onClick={modalControl}>
                                    <div className='flex w-full h-full rounded-2xl overflow-hidden  gap-3 '>
                                        <img src={data.images[0]} alt="" className='w-1/2 h-auto object-cover' />
                                        <div className='w-1/2 flex justify-between gap-y-3 flex-wrap rounded-r-lg overflow-hidden'>
                                            <img src={data.images[1]} alt="" className='h-1/2 w-[48.5%] object-cover' />
                                            <img src={data.images[2]} alt="" className='h-1/2 w-[48.5%] object-cover' />
                                            <img src={data.images[3]} alt="" className='h-1/2 w-[48.5%] object-cover' />
                                            <img src={data.images[4]} alt="" className='h-1/2 w-[48.5%] object-cover' />
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div className='flex justify-between'>
                                <div className='flex'>
                                    <h1 className='text-2xl font-bold mr-10'>{data.name}</h1>
                                    <div className='text-midGreen flex '>
                                        <h2 className='mr-1 font-medium text-xl '> {data.rating}</h2> <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 96 960 960" width="25" fill="#467971"><path d="M213 881q-43.594-45-68.297-104Q120 718 120 656q0-73 25.5-133.5T222 411q35-35 87-59t122.5-37.5Q502 301 591 297.5t198 3.5q8 108 5.5 197.5t-16 160.75q-13.5 71.25-38 124.563T680 873q-51 51-110 77t-126 26q-69 0-126.5-23.5T213 881Zm103 0q25 17 58 26t69.923 9Q497 916 547 894t91-64q27-27 46-70.5t31-103Q727 597 731 522t0-165q-94-2-168.5 2.5T431 376q-57 12-98 30.5T266 452q-42 43-64 91t-22 98q0 48 20.5 100.5T251 826q53-98 127-176t157-123q-87 75-141 162.5T316 881Zm0 0Zm0 0Z" /></svg>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30" fill="#467971"><path d="m480 935-41-37q-105.768-97.121-174.884-167.561Q195 660 154 604.5T96.5 504Q80 459 80 413q0-90.155 60.5-150.577Q201 202 290 202q57 0 105.5 27t84.5 78q42-54 89-79.5T670 202q89 0 149.5 60.423Q880 322.845 880 413q0 46-16.5 91T806 604.5Q765 660 695.884 730.439 626.768 800.879 521 898l-41 37Zm0-79q101.236-92.995 166.618-159.498Q712 630 750.5 580t54-89.135q15.5-39.136 15.5-77.72Q820 347 778 304.5T670.225 262q-51.524 0-95.375 31.5Q531 325 504 382h-49q-26-56-69.85-88-43.851-32-95.375-32Q224 262 182 304.5t-42 108.816Q140 452 155.5 491.5t54 90Q248 632 314 698t166 158Zm0-297Z" /></svg>
                            </div>
                            <p className='font-light mb-4'>{data.region}, {data.commune}</p>
                            <p>{data.description}</p>
                            <div className='mt-24 pb-24'>
                                <h1 className='text-2xl font-bold mb-12'>Commentaires</h1>
                                <div>
                                    {data.comments.length !== 0 ?

                                        <div className='justify-between flex flex-wrap'>
                                            {data.comments.map((comment, index) =>
                                                // eslint-disable-next-line react/no-array-index-key
                                                <CabinComment comment={comment} key={index} />
                                            )}
                                        </div> : <div><p>Il n'y a aucun commentaire pour l'instant</p></div>

                                    }
                                    {isConnected &&
                                        <div className='mt-8 '>
                                            {openedCommentForm ? <CommentForm close={setOpenedCommentForm} user={currentUser} data={data} postedComment={changeCommentState} /> :

                                                <button type='button' className='text-midGreen underline' onClick={commentFormControl}>Laisser un commentaire</button>
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='w-1/4 h-screen flex flex-col'>
                            <div className='fixed border-solid p-5'>
                                <h1 className='text-xl font-bold mb-8'>Choisissez vos dates</h1>
                                <div className=' w-full h-fit mb-8  flex flex-col gap-8' >
                                    <div className="flex flex-col">
                                        <label htmlFor="dateStart" className="text-darkGreen pb-1 pl-1">Date de début</label>
                                        <input type="date" min={minDate} name="dateStart" id="dateStart" className="w-[160px] rounded-lg border border-midGreen text-[#757575] focus:font-semibold focus:border focus:border-darkGreen focus:ring-0 focus:text-darkGreen" onChange={getDates} />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="dateEnd" className="text-darkGreen pb-1 pl-1">Date de fin</label>
                                        <input type="date" name="dateEnd" min={minDate} id="dateEnd" className="w-[160px] rounded-lg border border-midGreen text-[#757575] focus:font-semibold focus:border focus:border-darkGreen focus:ring-0 focus:text-darkGreen" onChange={getDates} />
                                    </div>
                                </div>
                                <div className=''>
                                    <h2 className='w-4/5 text-xl'>Vous n’êtes plus qu’à un click d’une <span className='text-midGreen font-bold'>expérience unique !</span></h2>

                                    <button type='button' className='bg-midGreen mt-6 w-fit h-fit py-2 px-8 rounded-lg text-white border border-midGreen text-2xl hover:bg-darkGreen duration-75'><NavLink to={`/reservation?id=${id}&dateStart=${dateStart}&dateEnd=${dateEnd}`}>Réserver</NavLink></button>
                                </div>
                            </div>
                        </div></>}
            </div>)
            : <div />
    )



};

export default Cabin;