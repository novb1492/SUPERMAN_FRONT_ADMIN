<template>
    <div id="eventInfor">
        이벤트일자<input type="date" v-model="eventDate" :disabled="flag" />
        <br>
        이벤트이름<input type="text" v-model="eventName" :disabled="flag" />
        <br>
        이벤트가격<input type="text" v-model="eventPrice" :disabled="flag" />
        <button @click="save" :disabled="flag">확인</button>
        <button @click="cancle" :disabled="!flag">취소</button>
    </div>
</template>

<script>


export default {
    data() {
        return {
            eventName: null,
            eventPrice: null,
            eventDate: null,
            flag: false
        }
    },
    methods: {
        save() {
            this.flag = true;
        },
        cancle() {
            this.flag = false;
        }
    }

}
</script>

<style>
</style>