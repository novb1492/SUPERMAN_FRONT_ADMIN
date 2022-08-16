<template>
    <div :id="'eventInfor' + index" class="eventInfor">
        이벤트시작일<input type="date" v-model="startDate" :disabled="flag" />
        <br>
        이벤트종료일<input type="date" v-model="endDate" :disabled="flag" />
        <br>
        이벤트이름<input type="text" v-model="eventName" :disabled="flag" />
        <br>
        이벤트가격<input type="text" v-model="eventPrice" :disabled="flag" />
        <button @click="save" :disabled="flag">확인</button>
        <button @click="update" :disabled="!flag">수정</button>
        <button @click="cancle">삭제</button>

    </div>
    {{ events }}
</template>

<script>
import { mapActions, mapGetters } from 'vuex';



export default {
    props: ["index"],
    data() {
        return {
            eventName: null,
            eventPrice: null,
            startDate: null,
            endDate: null,
            flag: false
        }
    },
    computed: {
        ...mapGetters("ProductStore", {
            eventFlag: 'getEventFlag',
            eventCount: 'getEventCount',
            events: 'getEvents'
        }),
    },
    methods: {
        ...mapActions("ProductStore", {
            setEvents: 'setEvents',
            setEventCount: 'setEventCount',
            setEventFlag: 'setEventFlag'
        }),
        save() {
            this.flag = true;
            let event = new Object;
            event.key = this.index;
            event.startDate = this.startDate;
            event.endDate = this.endDate;
            event.name = this.eventName;
            let eventArr = this.events;
            let flag2 = false;
            for (var i in eventArr) {
                if (eventArr[i].key == this.index) {
                    flag2 = true;
                    eventArr[i] = event;
                    this.setEvents(eventArr);
                    return;
                }
            }
            if (!flag2) {
                eventArr[eventArr.length] = event;
                this.setEvents(eventArr);
            }
        },
        update() {
            this.flag = false;
        },
        cancle() {
            document.getElementById('eventInfor' + this.index).hidden = true;
            let eventArr = this.events;
            for (var i in eventArr) {
                console.log(eventArr[i]);
                if (eventArr[i].key == this.index) {
                    eventArr[i] = [];
                    this.setEvents(eventArr);
                    return;
                }
            }
            if(document.getElementsByClassName('eventInfor').length<=1){
                this.setEventFlag(false);
            }
        }
    }

}
</script>

<style>
</style>