import luxon from 'luxon';

const {DateTime: luxonDT} = luxon;

export let nowInSeconds = luxonDT.now().toSeconds();

export const resetNow = () => nowInSeconds = luxonDT.now().toSeconds();

const pluralize = (unit, count) => count === 1 ? unit : `${unit}s`;

const MINUTES = {
    factor: 60,
    label: "minute"
};
const HOURS = {
    factor: 60,
    label: "hour"
};

const instructions = (payload) => {
    if (payload.units.length === 0) {
        return false;
    }
    return payload.currentValue.value >= payload.units[0].factor;
}

const pipeline = (instructions) => (payload) => {
    while (instructions(payload)) {
        const unit = payload.units.shift();
        const {currentValue} = payload;
        currentValue.value = Math.floor(currentValue.value / unit.factor);
        currentValue.label = unit.label;
        payload = {
            ...payload,
            currentValue
        };
    }
    return {
        ...payload,
        continue: false
    };
};

const toRelative = (date) => {
    const payload = {
        units: [MINUTES, HOURS],
        currentValue: {
            value: Math.floor(nowInSeconds - date.toSeconds()),
            label: "second"
        },
        continue: true
    }
    const {currentValue} = pipeline(instructions)(payload);
    const {value, label} = currentValue;

    return `${value} ${pluralize(label, value)} ago`;
};

export const DateTime = {
    now: () => luxonDT.now(),
    toRelative
};

export default {
    DateTime,
    nowInSeconds,
    resetNow
};
