import React, { useState, useEffect } from 'react'
import useAsync from '../../util/useAsync';
import styled from 'styled-components';
import Product from './Product'
import Button from '../inputs/Button';
import { getProducts } from '../../util/api';
import SkeletonProduct from './SkeletonProduct';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.column}, 1fr);
    gap: 40px 20px;
`
const ButtonWrapper = styled.div`
    margin-top: 30px;
    text-align: center;
    > *{
        width: 100%;
    }
`

function Products ({column, repatch}) {
    const [limit, setLimit] = useState(20)
    const [productList, setProductList] = useState([])
    const [response, repatchResponse] = useAsync(() => getProducts(limit),[limit])
    
    useEffect(() => {
        if(response.data){
            setProductList(response.data.data)
        }
    }, [response])

    useEffect(() => {
        if(repatch){
            repatchResponse()
        }
        // eslint-disable-next-line
    }, [repatch])
    
    const skeleton = () => {
        const result = [];
        for (let i = 0; i < 20; i++) {
            result.push(<SkeletonProduct key={i}/>);
        }
        return result;
    };
    
    return(
        <>
            <Wrapper column={column}>
                {productList[0] ? productList.map((product) => (
                    <Product
                        key={product["item-id"]}
                        url={product["url"]}
                        storeName={product["store-name"]}
                        itemName={product["item-name"]}
                        price={product["price"]}
                        imageCount={product["image-count"]}
                        visibility={product["visibility"]}
                        deleted={product["deleted"]}
                        href={`https://${product["store-id"]}.selleree.shop/products/${product["item-id"]}`}
                    />
                )): skeleton()}
            </Wrapper>
            <ButtonWrapper>
                <Button onClick={() => setLimit(prev => prev + 20)} isLoading={response.loading}>20개 더 보기</Button>
            </ButtonWrapper>
        </>
    )
}

Products.defaultProps = {
    column: 4,
}

export default Products
