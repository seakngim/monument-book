import { Button, Form, Input } from "antd";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { FaFacebookF, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const ContactComponent = () => {
  const onFinish = (values) => {
    console.log("Received values:", values);
  };
  return (
    <div className="background-gradient text-gray-500">
      <div className="max-w-[80%] m-auto w-full">
        <div className="text-center py-5 lg:py-10 font-bold text-2xl sm:text-4xl md:text-4xl lg:text-[3.75rem] text-[#292D77]">
          Contact <span className="text-[#2BD7AD]">US</span>
        </div>
        <div className="text-center md:text-base text-sm lg:px-36 md:px-10">
          Monument Books was established in Phnom Penh in 1993 and has grown to
          become the largest chain of bookstores in Cambodia. Today there are 12
          stores in six cities throughout Cambodia, Laos and Myanmar
        </div>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 container mx-auto gap-10 py-5">
          <Form
            layout="vertical"
            autoComplete="off"
            onFinish={onFinish}
            className="form-container"
          >
            <Form.Item
              name="fullName"
              rules={[
                { required: true, message: "Please enter your full name" },
              ]}
            >
              <Input placeholder="Full name" size="large" className="responsive-input bg-inherit text-[#292D77] border-gradient" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email address",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input placeholder="Email address" size="large" className="responsive-input bg-inherit text-[#292D77] border-gradient" />
            </Form.Item>

            <Form.Item
              name="subject"
              rules={[
                { required: true, message: "Please enter the subject" },
              ]}
            >
              <Input placeholder="Subject" size="large" className="responsive-input bg-inherit text-[#292D77] border-gradient" />
            </Form.Item>

            <Form.Item
              name="message"
              rules={[
                { required: true, message: "Please enter your message" },
              ]}
            >
              <Input.TextArea rows={6} size="large" className="responsive-input bg-inherit text-[#292D77] border-gradient" placeholder="Your message" />
            </Form.Item>
            <Button htmlType="submit" size="large" className="responsive-input  bg-[#292D77] text-gray-50 " >
              Send Message
            </Button>
          </Form>
          <section className="hidden md:block lg:block xl:block xxl:block">
            <div className="font-bold text-[#292D77]">Head Office</div>
            <Link to="tel:(+855) 012 34 567" className="flex mt-4">
              <FaPhoneAlt className="me-5 mt-1 text-[#292D77] iconStyle" />
              <span>012 34 567</span>
            </Link>
            <div className="flex mt-4">
              <BsFillEnvelopeFill className="me-5 mt-1 text-[#292D77] iconStyle" />
              <a href="mailto:sambo@monument-books.com">sambo@monument-books.com</a>

            </div>
            <div className="flex mt-4">
              <FaFacebookF className="me-5 mt-1 text-[#292D77] iconStyle" />
              <Link
                to="https://www.facebook.com/monumentbooksandtoys"
              >
                facebook.com/monumentbooksandtoys
              </Link>
            </div>
            <div className="border border-b border-[#2BD7AD] w-100 ml-1 mt-5 responsive-input"></div>
            <div className="mt-5 font-bold text-[#292D77]">Monument Books & Toys Norodom</div>
            <Link to="tel:(+855) 012 34 567" className="flex mt-4">
              <FaPhoneAlt className="me-5 mt-1 text-[#292D77] iconStyle" />
              <span>01234567</span>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;