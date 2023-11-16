import { useEffect,useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { Link } from "react-router-dom/dist/umd/react-router-dom.development";
import  axios  from "axios";





function AddProduct()
{
    const navigate=useNavigate();
    const [productName,setProductName]=useState('');
    const [productDesc,setProductDesc]=useState('');
    const [productPrice,setProductPrice]=useState('');
   const [productCategory,setProductCategory]=useState('');
   const [productImage,setProductImage]=useState('');

    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login');
        }
    },[])
    const handleApi=()=>{
        const formData = new FormData();
        formData.append('productName',productName);
        formData.append('productDesc',productDesc);
        formData.append('productPrice',productPrice);
        formData.append('productCategory',productCategory);
        formData.append('productImage',productImage);
        const url='http://localhost:8080/add-product';
        axios.post(url,formData)
        .then((res)=>{
            console.log(res);
           

        })
        .catch((err)=>{
            console.log(err);
            alert('server error');
        })
    }
    return (
        <div>
            <Header/>
            <div className="p-3">
            <h2>ADD PRODUCT HERE:</h2>
            <label >Product Name</label>
            <input type="text" className="form-control" value={productName}
            onChange={(e)=>{setProductName(e.target.value)}}/>
            <label >Product Description</label>
            <input type="text" className="form-control" value={productDesc} 
             onChange={(e)=>{setProductDesc(e.target.value)}}/>
            <label >Product Price</label>
            < input type="text" className="form-control" value={productPrice}
            onChange={(e)=>{setProductPrice(e.target.value)}}/>
            <label >Product Category</label>
            <select className="form-control"  value={productCategory}
             onChange={(e)=>{setProductCategory(e.target.value)}}>
                <option >BIKES</option>
                <option >Mobiles</option>
                <option >Clothes</option>
                <option >Cars</option>
            </select>
            <label >Product Image</label>
            < input type="file" className="form-control" 
            onChange={(e)=>{setProductImage(e.target.files)}}/>
            <button onClick={handleApi} className="btn btn-primary mt-3">SUBMIT</button>
            </div>
        </div>
    )
}
export default AddProduct;