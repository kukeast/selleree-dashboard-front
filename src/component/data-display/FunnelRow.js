import React from 'react'
import styled, { css } from 'styled-components'
import { COLOR } from '../../constants/color'

const Wrapper = styled.div`
    display: flex;
    &:hover{
        background-color: ${COLOR.gray1};
        border-radius: 8px;
    }
    transition: 0.2s;
    background-color: ${COLOR.white};
    margin: 4px 0;
    padding: 16px;
    font-size: 15px;
    color: ${COLOR.black};
    align-items: center;
`
const Step = styled.div`
    flex: 1;
`
const Title = styled.div`
    flex: 2;
    `
const Rate = styled.div`
    flex: 1;
    text-align: center;
    ${props => props.rate >= 80 && props.rate !== 100
        ? css`
            color: ${COLOR.green6};
            font-weight: bold;
        ` 
        : props.rate <= 20
        ? css`
            color: ${COLOR.red};
            font-weight: bold;
        ` 
        : css`
            color: ${COLOR.black};
        ` 
    };
`
const Count = styled.div`
    flex: 1;
    text-align: right;
`

function FunnelRow ({data}) {
    const count = data.count.toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return(
        <Wrapper>
            <Step>{data.step}</Step>
            <Title>{data.title}</Title>
            <Rate rate={data.conversionRate}>
                {data.conversionRate ? data.conversionRate + "%" : "-"}
            </Rate>
            <Rate>{data.bounceRate ? data.bounceRate + "%" : "-"}</Rate>
            <Rate rate={data.previousStepConversionRate}>
                {data.previousStepConversionRate ? data.previousStepConversionRate + "%" : "-"}
            </Rate>
            <Rate>{data.previousStepBounceRate ? data.previousStepBounceRate + "%" : "-"}</Rate>
            <Count>{count}</Count>
        </Wrapper>
    )
}

export default FunnelRow