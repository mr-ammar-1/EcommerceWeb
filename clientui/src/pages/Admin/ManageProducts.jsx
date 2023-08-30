import React, { useContext, useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Divider from "../../Components/Divider";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";


import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Combobox from "react-widgets/Combobox";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Select,  Avatar, Badge } from "antd";
import { SaveOutlined } from "@ant-design/icons";

const { Option } = Select;


const ManageProducts = () => {

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '1000',
    uploading: false,
    paid: true,
    category: '',
    loading: false,
 });
 const [image, setImage] = useState({});
 const [preview, setPreview] = useState('');
 const [uploadButtonText, setUploadButtonText] = useState('Upload Image');

 const handleChange = (e) => {
   setValues({...values, [e.target.name]: e.target.value });
 }

 const handleImageUpload = (e) => {
    let file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });

    // image Resizing
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 1000, 0, async (url) =>{
           try {           
             let {data} = await axios.post("http://localhost:8000/product/upload-image",{
                image: url,
             }); 
             console.log("IMAGE UPLOADED", data);
             //set Image in the state 
             setImage(data);
             setValues({ ...values, loading: false });

           } catch (err) {
               console.log(err);
               setValues({ ...values, loading: false });
               toast("Image Upload failed. Try again later!!");
           }
    });
 }
 const handleImageDelete = async () => {
     try {
       setValues({ ...values, loading: true });
       const res = await axios.post('http://localhost:8000/product/remove-image',{image});  
       setImage({});
       setPreview('');
       setUploadButtonText("Upload Image"); 
       setValues({ ...values, loading: false });
   } catch (err){
       console.log(err);
       setValues({ ...values, loading: false });
       toast("Something went wrong!!");
   }
 }
 
 const handleSubmitted = async (e) => {
    e.preventDefault();
    console.log(values);
 }








  const [productsArray, setProductsArray] = useState([]);
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false)
  const [editProduct ,setEditProduct] = useState({})
  const handleClose = () => {
    setShow(false)
    setIsEdit(false)
  }
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const options = ["Electronics", "Sports", "Garments", "Fashion", "Home"];
  const ratings = [1, 2, 3, 4, 5];

  const getProduct = async (id) => {
    setLoading(true)
    try {
      const {data} = await axios.get(`http://localhost:8000/product/${id}`);
      setEditProduct(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
const handleEdit = (id) => {
  handleShow()
  setIsEdit(true)
  getProduct(id)
}
  const defaultOption = options[0];
  const getProducts = async () => {
    try {
      let { data } = await axios.get("http://localhost:8000/products");
      setProductsArray(data);
    } catch (err) {
      console.log("Error", err);
    }
  };


 

  const delProduct = async (id) => {
    try {
      const data = await axios.delete(`http://localhost:8000/products/${id}`);
    } catch (error) {}
  };

  


  useEffect(() => {
    getProducts();
  }, []);

  async function submit(e) {
    e.preventDefault();

    // console.log(formData.category);
    try {
      setLoading(true);
      const {data} = await axios.post("http://localhost:8000/product/add", {
        id: productsArray?.length + 1,
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: formData.price,
        rating: formData.rating,
        quantity: formData.quantity,
        picture:image.Location,
      });

      toast.success("Product Added Successfully ....");
      setProductsArray([...productsArray, data])
      setLoading(false);
      handleClose()

      // console.log("SIGNUP RESPONSE: ", data);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  }

  const editData = async () => {
    try {
      const {data} = await axios.put(`http://localhost:8000/product/${editProduct?.id}`, formData );
      getProducts()
      handleClose()

    } catch (error) {}
  }

  return (
    <div>
      <Dashboard />
        <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit" : "Add"} Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=" bg-primary flex justify-center items-center">
            <div className="bg-white p-4 rounded w-[475px]">
              <h1 className="text-primary py-4 text-center text-2xl">
                <span className="text-orange-500 text-2xl">
                  {" "}
                  {isEdit ? "Edit" : "Add New"} Product
                </span>
              </h1>
              <Divider />

              {loading ? "Loading..." : (
                <Form layout="horizontal">
                <Form.Item label="Name" name="name">
                  <Input
                    placeholder="Name"
                    value={formData.name}
                    defaultValue={isEdit ? editProduct?.name : ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item label="Description" name="description">
                  <Input
                    placeholder="description"
                    value={formData.description}
                    defaultValue={isEdit ? editProduct?.description : ""}

                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item label="Price" name="price">
                  <Input
                    placeholder="price"
                    value={formData.price}
                    defaultValue={isEdit ? editProduct?.price : ""}

                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item label="Category" name="category">
                  <Dropdown
                    options={options}
                    value={ formData.category}
                    placeholder="Select an option"
                    // defaultValue={isEdit ? editProduct?.category : ""}

                    onChange={(e) =>
                      setFormData({ ...formData, category: e.value })
                    }
                  />
                </Form.Item>
                <Form.Item label="Quantity" name="quantity">
                  <Input
                    placeholder="quantity"
                    value={formData.quantity}
                    defaultValue={isEdit ? editProduct?.quantity : ""}

                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item label="Rating" name="rating">
                  <Dropdown
                    options={ratings}
                    value={formData?.rating}
                    placeholder="Select an option"
                    defaultValue={isEdit ? editProduct?.rating : ""}

                    onChange={(e) =>
                      setFormData({ ...formData, rating: e.value })
                    }
                  />
                </Form.Item>
               <Form.Item label="Image" >
               <div className="row pt-3">
              <div className="col-md-8">
                  <div className="form-group">
                      <label className="btn btn-outline-primary col-12 text-left">
                         {uploadButtonText}
                         <input type="file" 
                         name="image" 
                         onChange={handleImageUpload} 
                         hidden />
                      </label>
                  </div>
               </div>   

               {preview && (
                 <div className="col-md-4">
                    <Badge count="X" onClick={handleImageDelete}
                    className="pointer">
                      <Avatar style={{width: "60px", height: "60px", marginTop: "-10px"}} width={200} src={preview} />
                    </Badge>
                 </div>
               )}
          </div>     

               </Form.Item>



              </Form>
            


              )}
              <hr />
                    <pre>{JSON.stringify(image, null, 4)}</pre>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="mt-3"
            onClick={isEdit ? editData : submit}
            disabled={
              !isEdit && !formData.name ||
              !isEdit && !formData.price ||
              !isEdit && !formData.description ||
              !isEdit && !formData.quantity ||
              loading
            }
          >
            {loading ? <SyncOutlined spin /> : "Save"}{" "}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container ">
        <div className="d-flex justify-content-between mt-3 ml-20">
          <h2>Products</h2>
          <button className="btn btn-success" onClick={handleShow}>
            +Add
          </button>
        </div>
        <table class="table ml-20">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {productsArray?.map((product, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{product?.name}</td>
                  <td>{product?.price}</td>
                  <td>{product?.category}</td>
                  <td>{product?.quantity}</td>
                  <td>
                    <button class="btn btn-secondary mx-2" onClick={() => handleEdit(product.id)}>Update</button>
                    <button
                      class="btn btn-danger"
                      onClick={() => delProduct(product?._id)}
                    >
                      Delete
                    </button>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
