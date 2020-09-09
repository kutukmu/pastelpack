import { FIND_FEATURED_PRODUCT_REQUEST,
    FIND_FEATURED_PRODUCT_SUCCESS,
    FIND_FEATURED_PRODUCT_ERROR,} from "../Contants/productConstants"

export default (state={},action)=>{

    switch(action.type){
        case FIND_FEATURED_PRODUCT_REQUEST:
            return {loading:true};
        case FIND_FEATURED_PRODUCT_SUCCESS:
            return {loading:false, product:action.payload};
        case FIND_FEATURED_PRODUCT_ERROR:
            return {loading:false, error:action.payload}
        default:
            return state
    }





}