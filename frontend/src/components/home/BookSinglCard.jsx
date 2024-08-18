import {Link}from 'react-router-dom';
import {PiBookOpenTextLight}from 'react-icons/pi';
import {BiUserCircle,BiShow}from 'react-icons/bi';
import {AiOutlineEdit}from 'react-icons/bs';
import { BsInfoCircle } from 'react-icons/bs';
import {MdOutlineDelete} from 'react-icons/md';
import {userState} from 'react';
import BookModal from './BookModal';

const BookSingleCard=(book)=>{
    const [showModal,setshowModal]=useState(false);

    return(
        <div key={book.id} className="border-2 border-grey-500 rounded-lg px-4 py-2 m-4 relativ hover:shad-x1">
                <h2 className='absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-1g'>
                    {book.publishYear}
                </h2>
                <h4 className='my-2 text-grey-500'>{book._id}</h4>
                <div className='flex justify-start items-center gap-x-2'>
                    <PiBookOpenTextLight className='text-red-300 text-2x1'/>
                    <h2 className='my-1'>{book.title}</h2>
                </div>
                <div className='flex justify-start items-center gap-x-2'>
                    <BiUserCircle className='text-red-300 text-2x1'/>
                    <h2 className='my-1'>{book.author}</h2>
                </div>
                <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
                    <BiShow
                    className='text-3xl text-blue-800 hover:text-black cursor-pointer'
                    onClick={()=>setshowModal(true)}
                    />
                    <Link to={'/books/details/${book.id}'}>

                    <BiUserCircle className='text-2x1 text-green-800 hover:text-black'/>

                    </Link>
                    <Link to={'/books/edit/${item.id}'}>
                    <AiOutlineEdit className='text-2x1 text-yellow-600 hover:text-black'/>


                    </Link>
                    <Link to={'/books/delete/${item.id}'}>
                    <MdOutlineDelete className='text-2x1 text-red-600 hover:text-black'/>


                    </Link>
                    

                </div>
                {
                    showModal && (
                        <BookModal book={book} onclose={()=>setshowModal(false)} />
                    )
                }

            </div>
        )
}
export default BookSingleCard