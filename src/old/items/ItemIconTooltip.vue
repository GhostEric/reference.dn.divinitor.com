<template>
    <div class="item-icon-tooltip" v-if="valid">
        <router-link v-if="!noLink" :to="{path: `/items/${itemEasyUrl}`, query: itemQuery}">
            <transition name="fade">
            <div v-if="loading" class="loading">
                <load-indicator
                :loadText="''"></load-indicator>
            </div>
            </transition>
            <transition name="fade">
                <div v-if="!loading" class="entry">
                    <div class="icon">
                        <item-icon 
                            class="centering"
                            :iconIndex="itemData.iconIndex" 
                            :rank="itemData.rank"
                            :count="stackSize"
                            :type="itemData.type.type"
                        ></item-icon>
                    </div>
                    <div :class="'itemtip ' + directionHint" v-if="!noTip">
                        <div class="remark">
                            <span class="iid">#{{ itemId }}</span>
                        </div>
                        <div class="head">
                            <span v-if="goldAmt">{{ goldAmt | thousands }}</span>
                            {{ name }}
                            <span class="count" v-if="count && count > 1">{{count}}</span>
                        </div>
                        <div class="remark">
                            <span v-if="itemData.level > 1" class="level">{{ itemData.level }} </span>
                            <span v-if="itemData.tier" class="tier"><span v-html="itemData.tier"/> </span>
                            <span :class="'rank-' + itemData.rank.toLowerCase()">{{ itemData.rank }} </span>
                            <span v-if="timeLimit">{{ timeLimit }}-day </span>
                            <span v-else-if="itemData.durationDays">{{ itemData.durationDays }}-day </span>
                            <span v-if="canUse" class="can-use">{{ canUse }} </span>
                            <span v-if="itemData.cashItem" class="cash">Cash </span>
                            {{ category }}
                        </div>
                        <slot></slot>
                    </div>
                    <div class="potential" v-if="potentialNum">
                        <div class="wrapper">
                            Option
                            <div class="potential-entry" v-for="s in potentialStatList" :key="s.abbv">
                                {{s.abbv}}
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </router-link>
        <template v-else>
            <transition name="fade">
            <div v-if="loading" class="loading">
                <load-indicator
                :loadText="''"></load-indicator>
            </div>
            </transition>
            <transition name="fade">
                <div v-if="!loading" class="entry" @click="$emit('click', userData)">
                    <div class="icon">
                        <item-icon 
                            class="centering"
                            :iconIndex="itemData.iconIndex" 
                            :rank="itemData.rank"
                            :count="stackSize"
                            :type="itemData.type.type"
                        ></item-icon>
                    </div>
                    <div :class="'itemtip ' + directionHint" v-if="!noTip">
                        <div class="remark">
                            <span class="iid">#{{ itemId }}</span>
                        </div>
                        <div class="head">
                            <span v-if="goldAmt">{{ goldAmt | thousands }}</span>
                            {{ name }}
                            <span class="count" v-if="count && count > 1">{{count}}</span>
                        </div>
                        <div class="remark">
                            <span v-if="itemData.level > 1" class="level">{{ itemData.level }} </span>
                            <span v-if="itemData.tier" class="tier"><span v-html="itemData.tier"/> </span>
                            <span :class="'rank-' + itemData.rank.toLowerCase()">{{ itemData.rank }} </span>
                            <span v-if="timeLimit">{{ timeLimit }}-day </span>
                            <span v-else-if="itemData.durationDays">{{ itemData.durationDays }}-day </span>
                            <span v-if="canUse" class="can-use">{{ canUse }} </span>
                            <span v-if="itemData.cashItem" class="cash">Cash </span>
                            {{ category }}
                        </div>
                        <slot></slot>
                    </div>
                    <div class="potential" v-if="potentialNum">
                        <div class="wrapper">
                            Option
                            <div class="potential-entry" v-for="s in potentialStatList" :key="s.abbv">
                                {{s.abbv}}
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </template>
    </div>
</template>

<script>
import Vue from 'vue';
import ItemIcon from "@/old/game/ItemIcon";
import ItemStat from "@/old/api/item/itemstat";

import Item from "@/old/api/item/item";

Vue.component('item-icon', ItemIcon);

import Loader from "@/components/util/Loader";
Vue.component("load-indicator", Loader);

export default {
    props: [
        "itemId", 
        "count", 
        "itemStub", 
        "noLink",
        "timeLimit",
        "goldAmt",
        "potentialNum",
        "rate",
        "userData",
        "noTip",
        'directionHint',
    ],
    name: "item-icon-tooltip",
    data: function() {
        return {
            stackSize: 0,
            loading: true,
            itemData: null,
            valid: true,
        }
    },
    created() {
        this.fetchData();
    },
    watch: {
        itemId(to, from) {
            if (to != from) {
                this.fetchData();
            }
        },
        count(to, from) {
            if (to != from) {
                this.stackSize = to;
            }
        }
    },
    computed: {
        name() {
            if (this.itemData.name) {
                if (this.itemData.name.name && this.itemData.name._NameID) {
                    return this.itemData.name.name;
                } else if (this.itemData.name._NameID) {
                    return "Item MID: " + this.itemData.name._NameID;
                }
            }
            
            return "Unnamed Item " + this.itemId;
        },
        canUse() {
            if (this.itemData.needClass) {
                return this.itemData.needClass.map(c => c.name).join("/");;
            }

            return null;
        },
        category() {
            return Item.getItemDetailedCategory(this.itemData);
        },
        statSet() {
            return ItemStat.joinStatSet(this.itemData.stats);
        },
        itemQuery() {
            let ret = {};
            if (this.potentialNum) {
                ret.potential = this.potentialNum;
            }

            return ret;
        },
        potentialStatList() {
            if (this.itemData.potentials && this.potentialNum) {
                let potentials = this.itemData.potentials;
                for (let k in potentials) {
                    let v = potentials[k];
                    if (v.potentialNumber == this.potentialNum) {
                        let ret = [];
                        let states = v.states;
                        for (let k1 in states) {
                            ret.push(ItemStat.getStateInfo(states[k1]));
                        }

                        return ret;
                    }
                }
            } else {
                return [];
            }
        },
        itemEasyUrl() {
            return Item.itemEasyUrl(this.itemId, this.itemData ? this.itemData : this.itemStub);
        }
    },
    methods: {
        fetchData() {
            this.loading = true;
            this.itemData = null;
            this.stackSize = this.count;
            this.valid = true;

            if (this.itemStub) {
                this.itemData = this.itemStub;
                if (!this.itemData.type) {
                    this.valid = false;
                    return;
                }
                this.loading = false;
                return;
            }

            Item.getItem(this.itemId, this.$store.state.regionCode,
                (res) => {
                    this.itemData = res;
                    this.loading = false;
                },
                (err) => {
                    // console.log(err);
                });
        }
    }
}
</script>

<style lang="less" scoped>
@import "../../less/core.less";

.item-icon-tooltip {
    position: relative;
    width: 58px;
    height: 54px;
    // border: 1px solid white;

    .entry {
        position: relative;
        color: @dv-c-body;
        // padding: 2px 4px 0 4px;
        width: 58px;
        height: 58px;
        transition: background-color 0.125s ease-in;
        cursor: pointer;

        .icon{
            padding-top: 2px;
            padding-left: 4px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }

        &:hover {
            background-color: fade(white, 10%);
            .icon {
                filter: brightness(150%);
            }
        }
        
        .itemtip {
            position: absolute;
            
            &.up {
                bottom: 100%;
            }
            &.down {
                top: 100%;
            }

            .left(0);
            opacity: 0.0;
            // transform: translateX(-50%);
            display: inline-block;
            .text-align(left);
            min-width: 100px;
            background: @dv-c-background;
            @supports ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))) {
                background: fade(@dv-c-background, 80%);
                backdrop-filter: blur(8px);
            }
            z-index: 10;
            pointer-events: none;
            padding: 10px 16px;
            border: 1px solid @dv-c-foreground;
            box-shadow: 0 0 20px fade(black, 80%);
            transition: opacity 0.125s ease-in;

            .head {
                padding: 0;
                font-size: 16px;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                font-family: @dv-f-geomanist;
                color: @dv-c-foreground;
                white-space: nowrap;

                .count{
                    color: @dv-c-accent-2;
                    &::before {
                        content: "x";
                        text-transform: none;
                        color: @dv-c-idle;
                    }
                }
            }

            .remark {
                font-size: 12px;
                letter-spacing: 0.2em;
                text-transform: uppercase;
                white-space: nowrap;

                .tier {
                    display: inline-block;
                    margin-right: 0.4em;
                }

                .level {
                    color: @dv-c-accent-2;
                    &::before {
                        content: "LV ";
                        font-size: 0.625em;
                        color: @dv-c-accent-1;
                    }
                }

                .can-use {
                    color: @dv-c-accent-2;
                }

                .cash {
                    color: #10A020;
                }
            }
        }

        &:hover {
            .itemtip {
                display: inline-block;
                opacity: 1.0;
            }
        }

        .potential {
            flex: 0 0 80px;
            position: relative;
            color: @dv-c-accent-1;
            font-size: 10px;
            font-weight: normal;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            text-align: center;
            .wrapper {
                position: absolute;
                right: 0;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
            }

            .potential-entry {
                font-size: 14px;
                color: @dv-c-foreground;
            }
        }

        .rate {
            position: absolute;
            .text-align(right);
            right: 0.4em;
            top: 50%;
            color: @dv-c-accent-1;
            transition: color ease-in 0.125s;
            transform: translate(0%, -50%);
            padding-bottom: 6px;

            &::after {
                content: "RATE";
                position: absolute;
                color: @dv-c-idle;
                font-size: 10px;
                bottom: -4px;
                left: 0;
                right: 0;
                text-align: center;
            }
        }

        &:hover .rate {
            color: @dv-c-foreground;
        }
    }

    .loading {
        position: absolute;

        .loader-box {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            padding: 16px 0 0 16px;
            
            .label {
                display: inline-block;
                text-transform: uppercase;
                letter-spacing: 0.2em;
                padding-top: 10px;
                .padding-left(10px);
                vertical-align: top;
                color: @dv-c-foreground;
            }

            .loader,
            .loader:after {
                border-radius: 50%;
                width: 2em;
                height: 2em;
            }
            .loader {
                display: inline-block;
                line-height: 100%;
                font-size: 16px;
                text-indent: -9999em;
                border-top: 0.2em solid rgba(0, 0, 0, 0.75);
                border-right: 0.2em solid rgba(0, 0, 0, 0.75);
                border-bottom: 0.2em solid rgba(0, 0, 0, 0.75);
                border-left: 0.2em solid @dv-c-foreground;
                background: rgba(0, 0, 0, 0.5);
                //   -webkit-transform: translateZ(0);
                //   -ms-transform: translateZ(0);
                //   transform: translateZ(0);
                -webkit-animation: load8 1.1s infinite linear;
                animation: load8 1.1s infinite linear;
            }
        }
    }
}
</style>
