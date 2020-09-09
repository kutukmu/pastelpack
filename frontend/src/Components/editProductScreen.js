import React, { Component } from "react";
import { getProductDetailsAction, editProductAction } from "../Actions/index";
import { connect } from "react-redux";
import axios from "axios";

class EditProductScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: "",
      image: "",
      description: "",
      stock: "",
      category: "",
      isFeatured: false,
    };
  }

  uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    this.setState({
      uploading: true,
    });
    axios
      .post("/api/uploads/s3", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        this.setState({
          image: response.data,
          uploading: false,
        });
      })
      .catch((error) => {
        this.setState({
          uploading: false,
        });
      });
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getProductDetailsAction(id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.productDetail !== this.props.productDetail) {
      if (this.props.productDetail.product) {
        const {
          name,
          price,
          image,
          description,
          stock,
          category,
        } = this.props.productDetail.product;
        this.setState({
          name,
          price,
          image,
          description,
          stock,
          category,
          uploading: false,
        });
      }
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.props.editProductAction(this.state, this.props.match.params.id);
  };

  render() {
    return (
      <div className="product-manage">
        <form onSubmit={this.onSubmit}>
          <div className="input-container">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type="text"
              className="input"
              value={this.state.name}
              onChange={(e) =>
                this.setState({ [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="input-container">
            <label htmlFor="name">Price</label>
            <input
              name="price"
              type="text"
              className="input"
              value={this.state.price}
              onChange={(e) =>
                this.setState({ [e.target.name]: e.target.value })
              }
            />
          </div>

          <div className="input-container">
            <label htmlFor="name">Image</label>
            <input
              name="image"
              type="text"
              className="input"
              value={this.state.image}
              onChange={(e) =>
                this.setState({ [e.target.name]: e.target.value })
              }
            />
          </div>

          {this.state.uploading ? (
            "Uploading ..."
          ) : (
            <div className="input-container">
              <label htmlFor="upload">Upload Image</label>
              <input
                type="file"
                name="upload"
                onChange={(e) => this.uploadFileHandler(e)}
              />
            </div>
          )}
          <div className="input-container">
            <label htmlFor="name">Description</label>
            <input
              name="description"
              type="text"
              className="input"
              value={this.state.description}
              onChange={(e) =>
                this.setState({ [e.target.name]: e.target.value })
              }
            />
          </div>

          <div className="input-container">
            <label htmlFor="name">Stock</label>
            <input
              name="stock"
              type="text"
              className="input"
              value={this.state.stock}
              onChange={(e) =>
                this.setState({ [e.target.name]: e.target.value })
              }
            />
          </div>

          <div className="input-container">
            <label htmlFor="name">Category</label>
            <input
              name="category"
              type="text"
              className="input"
              value={this.state.category}
              onChange={(e) =>
                this.setState({ [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="input-container checkbox">
            <label htmlFor="isFeatured">Featured</label>
            <input
              name="isFeatured"
              type="checkbox"
              className="input checkboxx"
              value={this.state.isFeatured}
              onChange={(e) =>
                this.setState({ [e.target.name]: !this.state.isFeatured })
              }
            />
          </div>

          <button type="submit">Edit Product</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  productDetail: state.productDetail,
});

const mapDispatchToProps = {
  getProductDetailsAction,
  editProductAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProductScreen);
