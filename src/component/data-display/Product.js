import React from 'react'
import styled from 'styled-components';
import { COLOR } from '../../constants/color';
import Skeleton from './Skeleton';

const Wrapper = styled.a`
    font-size: 14px;
    color: ${COLOR.black};
    transition: 0.2s;
    &:hover{
        transform: translateY(-10px);
    }
`
const ImageSkeleton = styled(Skeleton)`
    width: 100%;
    padding-top: 100%;
`
const Image = styled.div`
    width: 100%;
    padding-top: 100%;
    background-image: url(${props => props.url}?w=600);
    background-color: ${COLOR.gray2};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 8px;
    border: 1px solid ${COLOR.gray2};
`
const StoreName = styled.p`
    font-size: 11px;
    font-weight: 600;
    color: ${COLOR.main};
    margin-top: 10px;
`
const ItemName = styled.p`
    margin-top: 6px;
`
const Price = styled.p`
    margin-top: 4px;
    font-weight: 500;
`
const Tags = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 10px;
    p{
        display: inline-block;
        padding: 4px 6px;
        font-size: 12px;
        border-radius: 8px;
    }
    .delete{
        background-color: rgba(246, 30, 82, 0.1);
        color: #F61E52;
    }
`
const ImageCount = styled.p`
    background-color: rgba(66, 133, 244, 0.1);
    color: #4285F4;
`
const Private = styled.p`
    background-color: ${COLOR.gray1};
    color: ${COLOR.gray6};
`
const Delete = styled.p`
    background-color: rgba(246, 30, 82, 0.1);
    color: #F61E52;
`

function Product ({ data, isLoading }) {
    if(isLoading){
        return(
            <Wrapper>
                <ImageSkeleton rounded/>
                <StoreName><Skeleton width={50} height={14}/></StoreName>
                <ItemName><Skeleton width={160} height={18}/></ItemName>
                <Price><Skeleton width={140} height={18}/></Price>
                <Tags><Skeleton width={30} height={23} rounded/></Tags>
            </Wrapper>
        )
    }else{
        return(
            <Wrapper href={`https://${data.store_id}.selleree.shop/products/${data.item_id}`} target="_blank" rel="noreferrer">
                <Image url={data.url}/>
                <StoreName>{data.store_name}</StoreName>
                <ItemName>{data.item_name}</ItemName>
                <Price>{data.price.slice(0,-3).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}???</Price>
                <Tags>
                    <ImageCount>{data.image_count}???</ImageCount>
                    {data.visibility === "PRIVATE" && <Private>?????????</Private>}
                    {data.deleted === "\u0001" && <Delete>?????????</Delete>}
                </Tags>
            </Wrapper>
        )
    }
}

export default React.memo(Product)
