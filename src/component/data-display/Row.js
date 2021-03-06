import React from 'react'
import { useHistory } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { COLOR } from '../../constants/color'
import Skeleton from './Skeleton'

const Wrapper = styled.div`
    display: flex;
    &:hover{
        background-color: ${COLOR.gray1};
        border-radius: 8px;
    }
    transition: 0.2s;
    background-color: ${COLOR.white};
    margin: 2px 0;
    padding: 16px;
    font-size: 14px;
    color: ${COLOR.black};
    align-items: center;
    cursor: pointer;
`
const Flex1 = styled.div`
    flex: 1;
`
const Flex2 = styled.div`
    flex: 2;
`
const Flex1Right = styled(Flex1)`
    display: flex;
    justify-content: end;
`
const Flex1Center = styled(Flex1)`
    display: flex;
    justify-content: center;
`
const Rate = styled(Flex1Center)`
    ${props => props.rate >= 70
        ? css`
            color: ${COLOR.green6};
            font-weight: bold;
        ` 
        : props.rate <= 30 && props.rate
        ? css`
            color: ${COLOR.red};
            font-weight: bold;
        ` 
        : css`
            color: ${COLOR.black};
        ` 
    };
`

function Row ({type, data, isLoading }) {
    const history = useHistory()
    if(isLoading){
        return(
            <Wrapper>
                {type === "seller-funnel" && 
                    <>
                        <Flex1><Skeleton width={40} height={19}/></Flex1>
                        <Flex2><Skeleton width={130} height={19}/></Flex2>
                        <Rate><Skeleton width={60} height={19}/></Rate>
                        <Rate><Skeleton width={60} height={19}/></Rate>
                        <Rate><Skeleton width={60} height={19}/></Rate>
                        <Rate><Skeleton width={60} height={19}/></Rate>
                        <Flex1Right><Skeleton width={100} height={19}/></Flex1Right>
                    </>
                }
                {type === "payment-setting" && 
                    <>
                        <Flex2><Skeleton width={130} height={19}/></Flex2>
                        <Flex1Right><Skeleton width={80} height={19}/></Flex1Right>
                        <Flex1Right><Skeleton width={80} height={19}/></Flex1Right>
                    </>
                }
            </Wrapper>
        )
    }else{
        return(
            <Wrapper onClick={() => history.replace({
                pathname: history.location.pathname,
                search: `?id=${data.id}`,
            })}>
                {type === "seller-funnel" && 
                    <>
                        <Flex1>{data.subtitle}</Flex1>
                        <Flex2>{data.title}</Flex2>
                        <Rate>
                            {data.conversionRate ? data.conversionRate + "%" : "-"}
                        </Rate>
                        <Rate>{data.bounceRate ? data.bounceRate + "%" : "-"}</Rate>
                        <Rate rate={data.previousConversionRate}>
                            {data.previousConversionRate ? data.previousConversionRate + "%" : "-"}
                        </Rate>
                        <Rate>{data.previousBounceRate ? data.previousBounceRate + "%" : "-"}</Rate>
                        <Flex1Right>{data.count.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</Flex1Right>
                    </>
                }
                {type === "payment-setting" && 
                    <>
                        <Flex2>{data.title}</Flex2>
                        <Flex1Right>{data.ratio}%</Flex1Right>
                        <Flex1Right>{data.count}</Flex1Right>
                    </>
                }
            </Wrapper>
        )
    }
}

export default Row