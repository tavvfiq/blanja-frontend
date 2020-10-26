import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./sellingproduct.module.css";
import "./myprofile.module.css";
import main from "../../assets/image/mainphoto.png";
import secondary from "../../assets/image/secondaryphoto.png";
import formattext from "../../assets/image/formattext.png";
import { addProductCreator } from "../../redux/actions/product";

export default function SellingProduct(props) {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    qty: "",
    category_id: "",
    status: "",
    description: "",
    img: [],
    imagePreviewUrl: [],
  });
  const inputRef = React.useRef();
  const handleChangeFile = (e) => {
    let reader = new FileReader();
    let files = e.target.files;
    let file = files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      let newImg = [...product.img, files[0]];
      setProduct({
        ...product,
        img: newImg,
        imagePreviewUrl: [...product.imagePreviewUrl, reader.result],
      });
    };
    // }
  };
  const { user } = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      price,
      qty,
      category_id,
      status,
      description,
      img,
      imagePreviewUrl,
    } = product;
    let formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("qty", qty);
    formData.append("category_id", category_id);
    formData.append("status", status);
    for (let i = 0; i < img.length; i++) {
      formData.append("img", img[i]);
    }
    formData.append("description", description);
    formData.append("seller_id", user.id);
    dispatch(addProductCreator(formData));
  };
  console.log(product.img, product.imagePreviewUrl);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 0,
        width: "100%",
      }}>
      <input
        multiple
        onChange={(e) => handleChangeFile(e)}
        ref={inputRef}
        type='file'
        multiple
        className={styles.hiddeninput}
      />
      {/* INVENTORY */}
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h6 className={styles.title}>Inventory</h6>
        </div>

        {/* FormContainer */}
        <div className={styles.formcontainer}>
          <div className={styles.form}>
            <label className={styles.label}>Name of goods</label>
            <input
              className={styles.input}
              onChange={(e) => {
                setProduct({ ...product, name: e.target.value });
              }}
            />
          </div>
        </div>
      </div>

      {/* ITEM DETAILS */}
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h6 className={styles.title}>Item details</h6>
        </div>

        {/* FormContainer */}
        <div className={styles.formcontainer}>
          <div className={styles.form}>
            <label className={styles.label}>Unit price</label>
            <input
              className={styles.input}
              onChange={(e) => {
                setProduct({ ...product, price: e.target.value });
              }}
            />
          </div>
          <div className={styles.form}>
            <label className={styles.label}>Stock</label>
            <input
              className={styles.input}
              onChange={(e) => {
                setProduct({ ...product, qty: e.target.value });
              }}
            />
          </div>
          <div className={styles.form}>
            <label className={styles.label}>Category Product</label>
            <select
              className={styles.input}
              name='category'
              onChange={(e) => {
                setProduct({ ...product, category_id: e.target.value });
              }}
              defaultValue='1'>
              <optgroup label='Category...'>
                <option value='1'>T-Shirts</option>
                <option value='2'>Shorts</option>
                <option value='3'>Jacket</option>
                <option value='4'>Pants</option>
                <option value='5'>Shoes</option>
                <option value='6'>Cap</option>
                <option value='7'>Wristwatch</option>
                <option value='8'>Handbag</option>
                <option value='9'>Backbag</option>
                <option value='10'>Socks</option>
                <option value='11'>Glasses</option>
                <option value='12'>Tie</option>
                <option value='13'>Dress</option>
                <option value='14'>Formal Suit</option>
                <option value='15'>Accessories</option>
                <option value='16'>High Heels</option>
              </optgroup>
            </select>
          </div>
          <div className={styles.form}>
            <label className={styles.label}>Condition</label>
            <div className={styles.radioselect}>
              <input
                type='radio'
                value='Baru'
                name='condition'
                style={{ marginRight: "5px", marginBottom: "18px" }}
                onChange={(e) => {
                  setProduct({ ...product, status: e.target.value });
                }}
              />
              <p className={styles.valueradio}>New</p>
              <input
                style={{
                  marginLeft: "25px",
                  marginRight: "5px",
                  backgroundColor: "red",
                  marginBottom: "18px",
                }}
                type='radio'
                value='Bekas'
                name='condition'
                onChange={(e) => {
                  setProduct({ ...product, status: e.target.value });
                }}
              />
              <p className={styles.valueradio}>Old</p>
            </div>
          </div>
        </div>
      </div>

      {/* PHOTO */}
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h6 className={styles.title}>Photo of goods</h6>
        </div>

        {/* FormContainer */}
        <div className={styles.formcontainer}>
          <div className={(styles.form, styles.formcontainer_img)}>
            <div className={styles.content_img}>
              {product.imagePreviewUrl[0] ? (
                <div
                  className={styles.main_img}
                  style={{
                    width: "120px",
                    height: "120px",
                    overflowY: "hidden",
                  }}>
                  <img
                    style={{ width: "120px", height: "auto" }}
                    src={
                      product.imagePreviewUrl[0]
                        ? product.imagePreviewUrl[0]
                        : main
                    }
                    alt=''
                  />
                </div>
              ) : null}
              {product.imagePreviewUrl[1] ? (
                <div
                  className={styles.secondary_img}
                  style={{
                    width: "80px",
                    height: "80px",
                    overflowY: "hidden",
                  }}>
                  <img
                    style={{ width: "80px", height: "auto" }}
                    src={
                      product.imagePreviewUrl[1]
                        ? product.imagePreviewUrl[1]
                        : secondary
                    }
                    alt=''
                  />
                </div>
              ) : null}
              {product.imagePreviewUrl[2] ? (
                <div
                  className={styles.secondary_img}
                  style={{
                    width: "80px",
                    height: "80px",
                    overflowY: "hidden",
                  }}>
                  <img
                    style={{ width: "80px", height: "auto" }}
                    src={
                      product.imagePreviewUrl[2]
                        ? product.imagePreviewUrl[2]
                        : secondary
                    }
                    alt=''
                  />
                </div>
              ) : null}
              {product.imagePreviewUrl[3] ? (
                <div
                  className={styles.secondary_img}
                  style={{
                    width: "80px",
                    height: "80px",
                    overflowY: "hidden",
                  }}>
                  <img
                    style={{ width: "80px", height: "auto" }}
                    src={
                      product.imagePreviewUrl[3]
                        ? product.imagePreviewUrl[3]
                        : secondary
                    }
                    alt=''
                  />
                </div>
              ) : null}
              {product.imagePreviewUrl[4] ? (
                <div
                  className={styles.secondary_img}
                  style={{
                    width: "80px",
                    height: "80px",
                    overflowY: "hidden",
                  }}>
                  <img
                    style={{ width: "80px", height: "auto" }}
                    src={
                      product.imagePreviewUrl[4]
                        ? product.imagePreviewUrl[4]
                        : secondary
                    }
                    alt=''
                  />
                </div>
              ) : null}
            </div>
            <div className={styles.edit_img}>
              <button
                onClick={() => {
                  inputRef.current.click();
                }}
                className={styles.btnupload}>
                Upload image
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h6 className={styles.title}>Description</h6>
        </div>

        {/* FormContainer */}
        <div className={styles.formcontainer}>
          <div className={(styles.form, styles.formcontainer_description)}>
            <img src={formattext} alt='' />
            <textarea
              className={styles.content_description}
              onChange={(e) => {
                setProduct({ ...product, description: e.target.value });
              }}
            />
          </div>
        </div>
      </div>
      <button
        className={styles.btnsell}
        onClick={(e) => {
          handleSubmit(e);
        }}>
        Sell
      </button>
    </div>
  );
}
