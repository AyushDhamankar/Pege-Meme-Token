import { Link } from "react-router-dom";
function Hero() {
  const styles = {
    minHeight: "90vh",
  };
  return (
    <section class="text-gray-400 bg-gray-900 body-font">
  <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center" style={ styles }>
    <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 class="title-font lg:text-5xl sm:text-4xl text-3xl mb-4 font-medium text-white">Welcome to Pege Meme Token!
      </h1>
      <p class="mb-8 lg:text-2xl leading-relaxed">Join the most exciting meme token revolution as we bring together the iconic Pepe and Doge memes. Pege Meme Token is here to captivate the meme community with its unique blend of humor, wit, and incredible value potential.</p>
      <div class="flex md:flex-row flex-col justify-center items-center">
        <button class="inline-flex lg:mb-0 mb-8 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"><Link to="/purchase" class="hover:text-white">Buy Token Now</Link></button>
      </div>
    </div>
    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <img class="object-cover object-center rounded" alt="hero" src="https://pbs.twimg.com/profile_images/1649569004388745217/r8A7Evob_400x400.jpg" />
    </div>
  </div>
</section>
  );
}

export default Hero;
