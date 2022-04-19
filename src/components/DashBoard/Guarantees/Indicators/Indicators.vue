<template src="./Indicators.html"></template>

<script lang="ts" src="./Indicators.ts"></script>

<style scoped lang="scss">
.guarantee-summary-indicators-box { //In utilities.scss

  h6 {
    margin-bottom: 7px;
    font-family: "Roboto", "Montserrat", Arial, sans-serif;
    font-size: 13px;
    font-weight: 400;
    color: var(--main-color);
    margin: 0;
    padding: 0 0 3px;
    @include for-phone-only {
      font-size: 0.6875em;
    }
  }

  h4 {
    margin-bottom: 2px;
    font-family: "Montserrat", "Roboto", Arial, sans-serif;
    font-weight: 900;
    margin: 0;
    padding: 0;
    font-size: 26px;
    @include for-phone-only {
      font-size: 1.125em;
    }

    span {
      font-weight: 800;
    }
  }

  p {
    margin: 0;
    padding: 0;
    font-family: "Roboto", "Montserrat", Arial, sans-serif;
    font-size: 14px;
    color: #838383;
    @include for-phone-only {
      font-size: 0.6875em;
    }
  }
}

.use-type h4 {
  margin-top: 8px;
  font-size: 14px;
  font-family: "Roboto", "Montserrat", Arial, sans-serif;

  @include for-phone-only {
    font-size: 11px;
  }
}

.generados,
.p-total,
.area {
  position: relative;
}

.generados::before,
.p-total::before,
.area::before {
  content: " ";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  width: 1px;
  height: 40px;
  background-color: #dcdcdc;
}

.generados::after,
.p-total::after,
.area::after {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  width: 1px;
  height: 40px;
  background-color: #dcdcdc;
}

.guarantee-summary-indicators-box .pendientes h4 span {
  color: #e26666;
}

@media only screen and (min-width: 768px) {
  .guarantee-summary-indicators-box h6,
  .guarantee-summary-indicators-box p {
    font-size: min(1.5vw, 14px);
  }

  .guarantee-summary-indicators-box h4 {
    font-size: min(2.7vw, 24px);
  }
}

.guarantee-summary-indicators-box .pendientes .good-green {
  color: #45c742;
}
.guarantee-summary-indicators-box .pendientes .late-yellow {
  color: #cfd23d;
}
.guarantee-summary-indicators-box .pendientes .very-late-orange {
  color: #fc8948;
}
.guarantee-summary-indicators-box .pendientes .urgent-red {
  color: #e73f3f;
}
.guarantee-summary-indicators-box .pendientes .normal-black {
  color: #333333;
}
</style>
