const Product = require("../models/Products");

module.exports = {
    createProduct: async (req, res) => {
        const newProduct = new Product({
            title: "Táo Rockit New Zealand (Ống 4 trái)",
            supplier: "Farmers Market",
            packing: [
                {
                    unit: "1 Ống",
                    price: "25",
                    discount: 10,
                },
                {
                    unit: "2 Ống",
                    price: "45",
                    discount: 10,
                },
            ],
            rating: 4.5,
            feedBack: [],
            imageUrl: [
                "https://product.hstatic.net/1000141988/product/tao_ong_52564f0c0b064117a0a422d167499b1f_1024x1024.jpg",
                "https://product.hstatic.net/1000141988/product/tao_rockit_new_zealand_-_ong_4_trai_3eaee984e42348a8972ae831e9d5ea74_1024x1024.jpg",
                "https://product.hstatic.net/1000141988/product/tao_ong1_7a45db3a81e4400cad74ff0180bd0803_1024x1024.jpg",
                "https://product.hstatic.net/1000141988/product/tao_ong2_28ffe5fa9c2148ca91dadc547175d09a_1024x1024.jpg",
            ],
            category: ["oversea", "new", "recommended"],

            description: ` Xuất xứ: New Zealand

Tiêu chuẩn chất lượng: Nhập Khẩu
            
Đặc điểm sản phẩm: 
            
    Trái vừa ăn, giòn, ngọt và có chút chua nhẹ.
    Loại táo ngon được nhiều người yêu thích. Trái to vừa với hộp ống tiện lợi mang đi.`,
            product_location: "New Zealand",
            isAvailable: true,
        });
        try {
            await newProduct.save();
            console.log("Product Added Successfully!!!");
            res.status(200).json("product created sucessfully");
        } catch (error) {
            res.status(500).json("failed to create the product");
        }
    },
    getAllProduct: async (req, res) => {
        try {
            const products = await Product.find().sort({ createdAt: -1 });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json("failed to get the products");
        }
    },
    getProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json("failed to get the product");
        }
    },
    searchProduct: async (req, res) => {
        try {
            const result = await Product.aggregate([
                [
                    {
                        $search: {
                            index: "furniture",
                            text: {
                                query: req.params.key,
                                path: {
                                    wildcard: "*",
                                },
                            },
                        },
                    },
                ],
            ]);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json("failed to get the products");
        }
    },
};
