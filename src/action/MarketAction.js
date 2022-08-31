import {  requestStoreInfo,requestGetCompanyNumAll } from "@/api/market/MarketApi"
import { BackButton403Error, checkNew, newTokenMessage, show400ErrorList } from "@/assets/js/Jslib";

export default {
    getStoreInfo(context, payload) {
        let id = payload.id;
        requestStoreInfo(id).then(response => {
            doneGetInfo(response,context);
        }).catch(error => {
            console.log(error);
            let response = error.response;
            let data = response.data;
            if (checkNew(response.status, data.message)) {
                requestStoreInfo(id).then(response => {
                    doneGetInfo(response,context);
                }).catch(error => {
                    getInfoError(error);
                });
            }
            else {
                getInfoError(error);
            }
        });
    },
    setAddr(context,value){
        context.commit('changeAddr', value);
    },
    setName(context,value){
        context.commit('changeName', value);
    },
    setThumbnail(context,value){
        context.commit('changeThumbNail', value);
    },
    setOpentime(context,value){
        context.commit('changeOpentime', value);
    },
    setDetailAddr(context,value) {
        context.commit('changeDetailAddr', value);
    },
    setPostcode(context,value) {
        context.commit('changePostcode', value);
    },
    setCompanynum(context,value) {
        context.commit('changeCompanynum', value);
    },
    setClosetime(context,value) {
        context.commit('changeClosetime', value);
    },
    setTel(context,value) {
        context.commit('changeTel', value);
    },
    setMinPrice(context,value) {
        context.commit('changeMinPrice', value);
    },
    setText(context,value) {
        context.commit('changeText', value);
    },
    setStoreId(context,value) {
        context.commit('changeStoreId', value);
    },
    setRadius(context,value) {
        context.commit('changeRadius', value);
    },
    requestGetCompanyNumAll(context){
        requestGetCompanyNumAll().then(response=>{
            doneGetCnAl(response,context);
        }).catch(error=>{
            let response = error.response;
            let data = response.data;
            if (checkNew(response.status, data.message)) {
                requestGetCompanyNumAll().then(response => {
                    doneGetCnAl(response,context);
                }).catch(error => {
                    getInfoError(error);
                });
            }
            else {
                getInfoError(error);
            }
        })
    },
}
function doneGetCnAl(response, context) {
    context.commit('changeCompanynums', response.data);
}
function doneGetInfo(response, context) {
    context.commit('changeStoreInfo', response.data);
}
function getInfoError(error) {
    let response = error.response;
    if(response.status==400){
        show400ErrorList(error);
        return;
    }
    else if(response.status==403&&response.data.message==newTokenMessage()){
        BackButton403Error();
        return;
    }
    alert(response.data.message);
}