<template src="./Guarantee.html"></template>

<script lang="ts" src="./Guarantee.ts"></script>

<style scoped lang="scss">
.sureti_guarantee_container {
  margin: 10px 0 15px;
  box-shadow: 0px 1px 2px rgba(132, 132, 132, 0.6);
  border-radius: 7px;
}
.sureti_guarantee_container.single {
  box-shadow: none;
}
.sureti_guarantee_summary {
  position: relative;
  margin: 1rem;
  background-color: var(--main-bg-color);
  padding: 1.25rem 0.85rem;
  border-radius: 5px;
  margin: 0 auto;
  font-family: "Roboto", sans-serif;
}
.single .sureti_guarantee_summary {
  background-color: #fff;
  padding: 0.85rem 0;
}

.sureti_guarantee_summary_info_title {
  h4 {
    font-family: "Montserrat", arial, sans-serif;
    color: var(--main-color);
    margin: 0;
    padding: 0;
    line-height: 1.15em;
  }

  p {
    margin: 0 0 15px;
    padding: 0;
  }
}
.sureti_guarantee_summary_info_title .sureti_guarantee_summary p,
.sureti_guarantee_summary button {
  font-family: "Roboto";
}

.sureti_guarantee_summary_info_title {
  display: inline-block;
  vertical-align: top;
  width: calc(100% - 40px);
  padding-left: 15px;
}
.guarantee-thumbnail {
  display: inline-block;
  vertical-align: top;
  width: 40px;
  @include for-phone-only {
    width: 30px;
  }
}

/***** Mobile Screen *****/

.sureti_guarantee_summary h4 {
  font-size: 1.1em;
  @include for-phone-only {
    font-size: 0.825em;
  }
}

.sureti_guarantee_summary_info {
  margin-bottom: 1.25rem;
  align-items: center;
}

.sureti_guarantee_summary_info img {
  max-width: 34px;
  margin-right: 1rem;
}

.sureti_guarantee_summary_info_title p {
  margin-top: 2px;
  letter-spacing: 1.02px;
  font-size: 1em;
  color: var(--secondary-color);
  @include for-phone-only {
    font-size: 0.75em;
  }
}

.summary_ver-detalle_container {
  width: 100%;
  height: 40px;
  position: relative;
}

button.summary_ver-detalle {
  position: absolute;
  top: 39%;
  left: 50%;
  transform: translateX(-50%);
  padding: 3px 12px;
  border: none;
  background-color: var(--main-bg-color);
  font-size: 16px;
  font-weight: 700;
  color: var(--main-color);
  @include for-phone-only {
    font-size: 0.825em;
  }
}

.summary_ver-detalle img {
  width: 10px;
  margin-left: 2px;
  padding-bottom: 2px;
  display: inline-block;
}
.single .guarantee-summary-indicators-box {
  margin-bottom: 10px;
  :last-child {
    justify-content: space-around;
  }
}

.su_features {
  justify-content: space-around;
}
</style>
