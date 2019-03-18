<template>
    <multiselect
            :value="values"
            @input="onInput"
            @select="onAdd"
            @remove="onRemove"
            :options="options"
            :multiple="true"
            :disabled="disabled"
            label="name"
            track-by="alpha3Code">
    </multiselect>
</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
  components: {
    Multiselect,
  },
  props: [
    'value',
    'options',
    'disabled',
  ],
  data() {
    return {
      values: [],
    };
  },
  mounted() {
    this.values = this.transformCountryObjects(this.value);
  },
  watch: {
    value(val) {
      this.values = this.transformCountryObjects(val);
    },
  },
  methods: {
    transformCountryObjects(countryCodeArray) {
      return this.options.filter(option => countryCodeArray.includes(option.alpha3Code));
    },
    transformCountryCodes(countryObjects) {
      return countryObjects.map(value => value.alpha3Code);
    },
    onAdd(countryObject) {
      this.$emit('add', countryObject.alpha3Code);
    },
    onRemove(countryObject) {
      this.$emit('remove', countryObject.alpha3Code);
    },
    onInput(countryObjects) {
      this.values = countryObjects;

      this.$emit('input', this.transformCountryCodes(countryObjects));
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
    .multiselect__tags{
        border-radius: 20px;
        border: 2px #243AA9 solid;
        color: #243AA9;
    }

    .multiselect__content-wrapper{
        border-radius: 20px;
        border: 2px #243AA9 solid;
        color: #243AA9;
    }

    .multiselect__tag {
        margin: 0 10px 0 0;
        background: #243AA9;
        border-radius: 10px;
    }

    .multiselect__option--highlight{
        background: #243AA9;
    }

    .multiselect__tag-icon:hover {
        background: transparent;
    }

    .multiselect__tag-icon::after {
        line-height: 16px;
        font-size: 16px;
        color: white;
    }

    .multiselect__select{
        border: none;
    }

    .multiselect--disabled .multiselect__current,
    .multiselect--disabled .multiselect__select{
        background: transparent;
    }
</style>
