<template>
    <div :id="'eventInfor' + index" class="eventInfor">
        이벤트시작일<input type="datetime-local" v-model="startDate" :disabled="flag" />
        <br>
        이벤트종료일<input type="datetime-local" v-model="endDate" :disabled="flag" />
        <br>
        이벤트이름<input type="text" v-model="eventName" :disabled="flag" />
        <br>
        이벤트가격<input type="text" placeholder="숫자만 입력해주세요" v-model="eventPrice" :disabled="flag" />
        <button @click="save" :disabled="flag">확인</button>
        <button @click="update" :disabled="!flag">수정</button>
        <button @click="cancle">삭제</button>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';



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
            events: 'getEvents',
            eventCancleCount: 'getEventCancleCount'
        }),
    },
    methods: {
        ...mapMutations("ProductStore",{
            setProductImgPath: "setProductImgPath",
            setEventFlag: 'setEventFlag',
            setEventCount: 'setEventCount',
            setEvents: 'setEvents',
            setEventCancleCount: 'setEventCancleCount'
        }),
        save() {
            this.flag = true;
            let event = new Object;
            event.key = this.index;
            event.startDate = this.startDate;
            event.endDate = this.endDate;
            event.name = this.eventName;
            event.price=this.eventPrice;
            let eventArr = [];
            eventArr = this.events;
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
            let count = this.eventCount;
            let cancleCount = this.eventCancleCount + 1;
            if (count - cancleCount <= 0) {
                this.setEventFlag(false);
                this.setEventCount(0);
                this.setEventCancleCount(0);
                this.setEvents([]);
            } else {
                this.setEventCancleCount(cancleCount);
                let eventArr = this.events;
                for (var i in eventArr) {
                    if (eventArr[i].key == this.index) {
                        eventArr.splice(i,1);
                        this.setEvents(eventArr);
                        return;
                    }
                }
            }


        }
    }

}
</script>

<style>
</style>