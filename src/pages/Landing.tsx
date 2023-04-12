import NavBarLanding from "../components/common/NavBarLanding";
import Wrapper from "../components/common/Wrapper";
import Intro from "../components/landing/Intro";
import Slider from "../components/landing/slider/Slider";

const Landing = () => {
  return (
    <Wrapper>
      <NavBarLanding />
      <Intro />
      <Slider />
    </Wrapper>
  );
};

export default Landing;