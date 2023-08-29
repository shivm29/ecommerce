import slugify from 'slugify'
import productModel from '../models/productModel.js'
// file system 
import fs from 'fs'

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping, fit } = req.fields
        const { photo } = req.files

        // validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' })
            case !description:
                return res.status(500).send({ error: 'Description is required' })
            case !price:
                return res.status(500).send({ error: 'Price is required' })
            case !category:
                return res.status(500).send({ error: 'Category is required' })
            case !quantity:
                return res.status(500).send({ error: 'Quantity is required' })

            case !photo || photo.size > 1000000:
                return res.status(500).send({ error: 'Upload a photo less than 1mb' })

        }

        const products = new productModel({ ...req.fields, slug: slugify(name) })

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }

        await products.save()

        res.status(201).send({
            success: true,
            message: 'Product created successfully',
            products
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in creating product",
            error,
        })
    }
}

export const getProductController = async (req, res) => {
    try {
        // .find({}) to search all products
        // .select('-photo) ensures that 'photo' field is excluded from the fetched data (we dont want to fetch photo during initial load | to avoid loading time)
        // limit(12) and sort() gives 12 products in descending order of their created dates
        // populate('category') add whole data of this particular id of category
        const products = await productModel.find({}).populate('category').select('-photo').limit(12).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            message: 'All products fetched',
            products,
            totalCount: products.length
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting products',
            error: error.message
        })
    }
}

export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.find({ slug: req.params.slug }).select("-photo").populate("category")
        res.status(200).send({
            success: true,
            message: 'Single product fetched',
            product
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: error.message,
            success: false,
            message: 'Error while fetching single product',
        })
    }
}

export const getPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo")

        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while fetching photo',
            error: error.message
        })
    }
}

export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success: true,
            message: "Product deleted successfully"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while deleting product',
            error: error.message
        })
    }
}

export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files

        // validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' })
            case !description:
                return res.status(500).send({ error: 'Description is required' })
            case !price:
                return res.status(500).send({ error: 'Price is required' })
            case !category:
                return res.status(500).send({ error: 'Category is required' })
            case !quantity:
                return res.status(500).send({ error: 'Quantity is required' })

            case photo && photo.size > 1000000:
                return res.status(500).send({ error: 'Upload a photo less than 1mb' })

        }

        const products = await productModel.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) }, { new: true }
        )

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }

        await products.save()

        res.status(201).send({
            success: true,
            message: 'Product updated successfully',
            products
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Updating product",
            error,
        })
    }
}
// filters
export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        console.log("checked", checked)
        console.log("radio", radio)
        let args = {};
        if (checked.length > 0) args.category = checked;

        if (radio.length > 0) {
            args.price = { $gte: radio[0], $lte: radio[1] };
            console.log('Price Args:', args.price);
        }
        console.log('Final Args:', args);

        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Filtering Products",
            error,
        });
    }
};

// product count
export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Error in product count",
            error,
            success: false,
        });
    }
};

// product list base on page
export const productListController = async (req, res) => {
    try {
        const perPage = 12;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in per page ctrl",
            error,
        });
    }
};

// search product : 
export const searchProductController = async (req, res) => {
    try {
        // $or operator performs a logical OR operation on an array of two or more <expressions> and selects the documents that satisfy at least one of the <expressions>

        // $regex operator provides the functionality for pattern matching in the queries

        // options : "i" to match both uppercase and lowercase pattern in string

        const { keyword } = req.params;
        const resutls = await productModel
            .find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ],
            })
            .select("-photo");
        res.json(resutls);

    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: 'Error in searching product',
            error,
            success: false
        })
    }
}