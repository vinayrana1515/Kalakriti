import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @Desc Fetch all products
// @Droute GET /api/products
// @access public route

const getProducts = asyncHandler( async ( req, res ) => { 
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number( req.query.pageNumber ) || 1

    
    const keyword = req.query.keyword ? { 
        name: { 
            $regex: req.query.keyword,
            $options:'i'
        }
    } : {}
    
    const count = await Product.countDocuments( { ...keyword } )
    


    const products = await Product.find( { ...keyword } ).limit( pageSize ).skip( pageSize * ( page - 1 ) )
    

    res.json( { products,page,pages:Math.ceil(count / pageSize) } )
    
})

// @Desc Fetch single products
// @Droute GET /api/products/:id
// @access public route

const getProductById = asyncHandler(async (req, res) => { 
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    }
    else {
        res.status(404)
        throw new Error('Product not found')
    }
    
})


//@desc Create new review 
//@route POST /api/routes/products/:id/reviews
//@access private

const createProductReview = asyncHandler( async ( req, res ) => { 
    const { 
        rating,comment
    } = req.body
    
     const product = await Product.findById(req.params.id)
    if ( product ) { 
        const alreadyReviewed = product.reviews.find( r => r.user.toString() == req.user._id.toString() )
        if ( alreadyReviewed ) { 
            res.status( 400 )
            throw new Error('Product already reviewed')
        }

        const review = { 
            name: req.user.name,
            rating: Number( rating ),
            comment,
            user:req.user._id
        }
        product.reviews.push( review )
        const total = product.reviews;
        
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce( ( acc, item ) => item.rating + acc, 0 ) / total.length
        
        await product.save()
        res.status(201).json({message:'Review added'})
        
    }
    else {
        res.status(404)
        throw new Error('Product not found')
    }
    
} )


//@desc GET top rated products
//@route GET /api/products/top
//@access public

const getTopProducts = asyncHandler( async ( req, res ) => { 
    const products = await Product.find( {} ).sort( { rating: -1 } ).limit( 3 )
    res.json(products)

 
      
} )

export { 
    getProducts,
    getProductById,
    createProductReview,
    getTopProducts
}
