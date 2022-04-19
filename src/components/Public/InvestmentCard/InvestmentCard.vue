<template src="./InvestmentCard.html"></template>

<script lang="ts" src="./InvestmentCard.ts"></script>

<style scoped lang="scss">
/*------------------------------------*\
  #UTILITY
\*------------------------------------*/

.su_investment_opportunity_card_container {
  padding-right: 2rem;
  line-height: 1;
  @include for-tablet-portrait-up {
    margin-bottom: 4rem;
  }

  @media only screen and (max-width: 622px) {
    width: 98vw;
    overflow: hidden;
    margin-bottom: 2rem;
  }

  @media only screen and (min-width: 712px) {
    width: 22rem;
  }

  @media only screen and (min-width: 786x) {
    width: 24rem;
  }

  @media only screen and (min-width: 850px) {
    width: 26rem;
  }

  @media only screen and (min-width: 914px) {
    width: 28rem;
  }

  @media only screen and (min-width: 978px) {
    width: 20rem;
  }

  @media only screen and (min-width: 1075px) {
    width: 22rem;
  }

  @include for-desktop-up {
    width: 24rem;
  }
}

/*------------------------------------*\
  #CARD TOP STYLES
\*------------------------------------*/
.su_investment_opportunity_card_top {
  position: relative;
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center center;
  background-color: $su-purple-80;
  border-radius: 10px 10px 0 0;

  .su_investment_oppportunity_avaluo {
    position: absolute;
    top: 1rem;
    left: 1rem;
    padding: 12px;
    text-align: center;
    background: #ffffff;
    border-radius: 5px;

    h6,
    p {
      font-size: 0.75em;
      font-family: "Roboto", "Montserrat", Arial, sans-serif;
      margin: 0;
    }

    h6 {
      font-weight: 400;
      color: #746ed1;
      margin-bottom: 2px;
    }

    h4 {
      font-size: 1.125em;
      font-family: "Roboto", "Montserrat", Arial, sans-serif;
      font-weight: 700;
      margin-bottom: 2px;
    }

    p {
      font-weight: 300;
    }
  }
}

/*------------------------------------*\
  #CARD BOTTOM STYLES
\*------------------------------------*/

.su_investment_opportunity_card_bottom {
  background: #f6f6f6;
  border-radius: 0px 0px 5px 5px;
  padding: 1rem;

  .su_investment_opportunity_title {
    h2 {
      margin-bottom: 0.3rem;
      line-height: 29px;
      letter-spacing: -0.019em;
      @include for-phone-only {
        font-size: 1.125em;
        line-height: 21px;
      }
    }

    p {
      font-size: 1.125em;
      letter-spacing: 0.02em;
      margin: 0 0 1rem;
      font-weight: 400;
      @include for-phone-only {
        font-size: 0.825em;
      }
    }
  }
}

.su_loan-funded {
  padding: 0.75rem 1rem 1rem 1rem;
  margin-bottom: 1rem;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 2px 8px rgba(29, 29, 29, 0.1);
  @include for-phone-only {
    padding-bottom: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .su_complete-bar {
    position: relative;
    width: 100%;
    height: 0.625rem;
    margin-bottom: 0.625rem;
    background: #d8e8d7;
    border-radius: 5px;
    @include for-phone-only {
      padding-bottom: 8px;
    }
  }

  .su_funded-bar {
    position: absolute;
    left: 0;
    height: 0.625rem;
    background: #45c742;
    border-radius: 5px;
  }

  .su_bar-info {
    h3 {
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: -0.017em;
      margin-bottom: 0.625rem;
      font-family: "Roboto";
      color: #312c77;
      @include for-phone-only {
        font-size: 0.825em;
        margin-bottom: 6px;
      }

      span {
        font-weight: 300;
      }
    }
  }

  .su_divisor-horizontal {
    height: 1px;
    width: 100%;
    margin-bottom: 6px;
  }
  .su_investors-active {
    display: flex;
    align-items: center;

    h3 {
      margin-right: 8px;
      color: #514ac6;
      margin-bottom: 0;
    }

    p {
      font-weight: 300;
      color: #9792dd;
      margin: 0;
    }
  }
}
.su_data-box {
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  padding: 1rem;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 8px rgba(29, 29, 29, 0.1);
    @include for-phone-only {
    margin-bottom: 0.75rem;
  }


  h6 {
    font-size: 0.875em;
    margin-bottom: 6px;
  }

  h4 {
    font-size: 1.3125em;
    color: #312c77;
    margin-bottom: 3px;
    @include for-phone-only {
      font-size: 1.125em;
    }
  }

  p {
    font-size: 0.875em;
    margin: 0;
  }
}

.su_divisor-vertical {
  width: 1px;
  height: 40px;
}

button {
  border: none;
}

.su_button {
  display: flex;
  width: 100%;
  padding: 20px 16px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  font-size: 1em;
  // background: linear-gradient(93.4deg, #514ac6 17.29%, #9792dd 88.06%);
  cursor: pointer;

    @include for-phone-only {
    padding: 1rem;
  }

  p {
    font-size: 1rem;
    color: #ffffff;
        @include for-phone-only {
    font-size: 0.875rem;
  }

  }

  img {
    height: 14px;
  }
}
</style>
