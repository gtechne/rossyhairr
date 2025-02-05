import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
      <HorizontalCardProduct category={"bone-straigh"} heading={"Bone straight"}/>

      <VerticalCardProduct category={"factory-wigs"} heading={"Factory wigs"}/>
      <VerticalCardProduct category={"blonde-hair"} heading={"Blonde hair"}/>
      <VerticalCardProduct category={"deep-wave"} heading={"Deep wave"}/>
      <VerticalCardProduct category={"burgundry-hairs"} heading={"Burgundry hairs"}/>
      <VerticalCardProduct category={"bouncy-hairs"} heading={"Bouncy hairs"}/>
      <VerticalCardProduct category={"egg-curly-wigs"} heading={"Egg curly wigs"}/>
      <VerticalCardProduct category={"Water-wavy"} heading={"Water wavy"}/>
      <VerticalCardProduct category={"burmese-curl"} heading={"Burmese curl"}/>
    </div>
  )
}

export default Home