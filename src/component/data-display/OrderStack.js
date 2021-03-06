import React, { useState } from 'react'
import { parseISO, format }from "date-fns"
import styled from 'styled-components'
import { COLOR } from '../../constants/color'
import Icon from './Icon';
import Order from './Order'

const Wrapper = styled.div`
    &:hover{
        > div:nth-child(2), > div:nth-child(3){
            height: 10px;
            opacity: 1;
        }
        > div:nth-child(1){
            background-color: ${COLOR.gray1};
        }
    }
    margin: 8px 0;
    cursor: s-resize;
`

const OrderWrapper = styled.div`
    position: relative;
    display: flex;
    border-radius: 8px;
    transition: 0.2s;
    background-color: ${COLOR.white};
    padding: 10px 16px;
    font-size: 14px;
    color: ${COLOR.black};
    align-items: center;
`
const Card1 = styled.div`
    background-color: ${COLOR.gray2};
    height: 0px;
    transition: 0.3s;
    border-radius: 0 0 8px 8px;
    margin: 0 15px;
    opacity: 0;
`
const Card2 = styled(Card1)`
    background-color: ${COLOR.gray3};
    margin: 0 30px;
`
const Image = styled.div`
    width: 60px;
    height: 60px;
    background-size: cover;
    border-radius: 8px;
    background-color: ${COLOR.gray2};
    margin-right: 16px;
    border: 1px solid ${COLOR.gray2};
`
const CreatedAt = styled.div`
    flex: 1.5;
`
const Title = styled.div`
    flex: 4;
`
const Name = styled.div`
    flex: 2.5;
`
const More = styled.div`
    display: flex;
    font-size: 15px;
    font-weight: 500;
    color: ${COLOR.main};
    text-align: right;
    justify-content: flex-end;
    gap: 6px;
    align-items: center;
    flex: 2;
`

function OrderExpand ({data, sortBy, length, onClick}) {
    var backgroundImage = {
        backgroundImage: "url(" + data.image_url + "?w=300)"
    }
    return(
        <Wrapper onClick={onClick}>
            <OrderWrapper>
                <CreatedAt>{format(parseISO(data[sortBy]), 'H시 m분 s초')}</CreatedAt>
                <Image style={backgroundImage}/>
                <Title>{data.title}</Title>
                <Name>{data.name}</Name>
                <More>
                    {length}개<Icon name="arrow_down" color={COLOR.main} size={16}/>
                </More>
            </OrderWrapper>
            <Card1/>
            {length > 2 && <Card2/>}
            
        </Wrapper>
    )
}

function OrderStack ( {orders, sortBy} ) {
    const [isExpand, setIsExpand] = useState(false)
    return(
        <>
            {isExpand ?
                orders.map(order => (
                    <Order
                        key={order.id}
                        data={order}
                        sortBy={sortBy}
                    />
                )):
                <OrderExpand
                    key={orders[0].id}
                    data={orders[0]}
                    length={orders.length}
                    sortBy={sortBy}
                    onClick={() => setIsExpand(true)}
                />
            }
        </>
    )
}

export default OrderStack
