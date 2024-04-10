import React from "react";
import monument_book_logo from "../../assets/images/MBLogo.png";
import monument_book_store_front from "../../assets/images/monument_book_store_front.jpg";
import monument_book_books from "../../assets/images/monument_book_books.jpg";
import missionVision from "../../assets/images/image_2024-03-27_21-49-23.png";

const aboutUsComponent = () => {
  return (
    <div>
      <div className="mt-10">
        <h1 className="font-bold text-3xl mx-auto text-center text-gray-500">ABOUT US</h1>
      </div>
      <div className="grid grid-cols-3 gap-10 w-[80%] mx-auto my-10 2xl:max-w-[94.9375rem]">
        <img
          className="col-span-1 w-full h-full object-cover mx-auto rounded-md"
          src={monument_book_store_front}
          alt="monument_book_logo"
        />
        <div className="col-span-2 ml-10 text-lg text-justify items-center ">
          <p style={{ textIndent: '35px' }}>
            At Monument Book, our mission is to foster a vibrant reading culture
            and promote literacy within our community. We are dedicated to
            providing a curated selection of diverse and engaging literature
            that inspires, educates, and entertains readers of all ages. Through
            our commitment to quality and accessibility, we strive to create an
            inclusive space where everyone feels welcome to explore the world of
            books and expand their horizons.
          </p>
          <p style={{ textIndent: '35px' }} className="mt-5">
            Central to our mission is the belief in the transformative power of
            reading. We aim to ignite imaginations, spark curiosity, and
            encourage lifelong learning through the pages of our books. By
            offering a wide range of titles that reflect the richness of human
            experiences and perspectives, we seek to facilitate meaningful
            connections between readers and the stories that resonate with them.
          </p>
          {/* <div className="w-[80vw] max-w-[] mx-auto md:w-[660px] lg:hidden">
            <img
              className="w-full h-full object-cover rounded-md"
              src={monument_book_books}
              alt="monument_book_logo"
            />
          </div> */}
          <p style={{ textIndent: '35px' }} className="mt-5">
            In pursuit of our mission, we actively engage with our community
            through literary events, author signings, book clubs, and
            educational initiatives. We collaborate with local schools,
            libraries, and organizations to promote literacy and support the
            development of reading skills among children and adults alike. By
            nurturing a love of reading and learning, we aim to make a positive
            impact on individuals and contribute to the cultural enrichment of
            our society.
          </p>
          <p style={{ textIndent: '35px' }} className="mt-5">
            Join us in our mission to celebrate the joy of reading and make a
            difference one book at a time. Together, let's build a brighter
            future through the power of literature.
          </p>
        </div>
      </div>
      <div className=" flex flex-col gap-20 p-5  bg-gray-200 text-gray-600 md:px-[50px] lg:grid lg:grid-cols-2 lg:px-[6.25rem]">
        <div className=" w-[80%] mx-auto flex flex-col gap-5">
          <div className="w-[5rem]"></div>
          <h1 className="text-4xl">MISSION & VISION</h1>
          <div className="flex flex-col gap-5 text-justify">
            <h4 className="text-xl font-bold">MISSION</h4>
            <p className=" text-lg " style={{ textIndent: '50px' }}>
              At Monument Book, our mission is to foster a vibrant reading culture
              by providing diverse and engaging literature. Through quality
              selections and inclusive spaces, we aim to spark curiosity, foster
              lifelong learning, and promote literacy. Join us in celebrating the
              joy of reading and building a brighter future through the power of
              literature.
            </p>
            <h4 className="text-xl font-bold">VISION</h4>
            <p className="text-lg" style={{ textIndent: '35px' }}>
              Our vision at Monument Book is to inspire, connect, and enrich lives
              through literature. We envision a future where everyone has access
              to diverse books that ignite imaginations and foster understanding.
              We strive to be a beacon of knowledge and creativity, fostering a
              lifelong love of learning and appreciation for the written word.
              Join us as we explore new worlds, uncover treasures, and make
              meaningful connections through the magic of literature.
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <img src={missionVision} alt="" />
        </div>
      </div>
    </div>
  );
};
export default aboutUsComponent;
