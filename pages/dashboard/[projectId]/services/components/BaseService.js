import React from 'react';
import TitleFragment from "../../../../TitleFragment";
import BaseTemplate from "../../../components/BaseTemplate";
import ServicesBar from "./ServicesBar";
import {useRouter} from "next/router";


const BaseService =(props)=>{

    return (
        <TitleFragment title="User Dashboard">
            <BaseTemplate
                content={
                    <ServicesBar/>
                }
            />
        </TitleFragment>

    );
};
export default BaseService;