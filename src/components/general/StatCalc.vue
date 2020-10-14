<template>
<div class="stats">
    <h1 class="divided">Stat Calculations</h1>
    <go-back />
    
    <h2><ui-string mid="2280" :inline="true" alt="Final Damage"/></h2>
    <stat-calc-card stat="finalDamage" />
    
    <h2><ui-string mid="27" :inline="true" alt="Critical"/></h2>
    <stat-calc-card stat="critical" />

    <template v-if="!hideCritDamage">
    <h2><ui-string mid="1000064495" :inline="true" alt="Critical Damage"/></h2>
    <stat-calc-card stat="criticalDamage" />
    </template>
    
    <h2><ui-string mid="20" :inline="true" alt="Defense"/></h2>
    <stat-calc-card stat="defense" />
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import GoBack from "@/components/util/GoBack.vue";
import UiString from "@/components/uistring/UiString.vue";
import StatCalcCard from "@/components/general/StatCalcCard.vue";

import StatCalcProvider,{ IStatCalcResult } from "@/api/StatCalcProvider";
import { getFeatureState, netFeatures } from '../../api/FeaturesProvider';

interface IData {
    stat: string;
    value: number;
}

export default Vue.extend({
    components: {
        GoBack,
        UiString,
        StatCalcCard,
    },
    data(): IData {
        return {
            stat: "",
            value: 0,
        };
    },
    computed: {
        hideCritDamage(): boolean {
            return getFeatureState(netFeatures.Use40Cap);
        },
    },
    created() {
    }
});
</script>

<style lang="less" scoped>
@import "./../../less/core.less";


</style>

