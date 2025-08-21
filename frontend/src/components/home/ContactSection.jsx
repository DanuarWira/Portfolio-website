import ContactInfoItem from "../ui/contactInfoItem";

export default function ContactSection() {
  const EmailIcon = "/Letter.png";
  const GithubIcon = "/github.png";
  const LinkedinIcon = "/linkedin.png";
  const PhoneIcon = "/whatsapp.png";

  return (
    <>
      <section className="px-6 py-16 sm:px-12 lg:px-28 lg:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-neutral-50">Get in Touch</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#5c19c3] to-[#e42a9f] mt-3 rounded-full" />
            </div>
            <div className="flex flex-col gap-6">
              <ContactInfoItem icon={EmailIcon} label="Email" value="danuarwiranata71@gmail.com" href="mailto:danuarwiranata71@gmail.com" />
              <ContactInfoItem icon={GithubIcon} label="Github" value="https://github.com/DanuarWira" href="https://github.com/DanuarWira" />
              <ContactInfoItem icon={LinkedinIcon} label="LinkedIn" value="https://www.linkedin.com/in/danuarw/" href="https://www.linkedin.com/in/danuarw/" />
              <ContactInfoItem icon={PhoneIcon} label="Phone Number" value="+62 81-232-922-115" href="tel:+6281232922115" />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-semibold text-neutral-50">Send me a message</h3>
            <form className="flex flex-col gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                  Your Email
                </label>
                <input type="email" id="email" name="email" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg text-neutral-50 focus:outline-none focus:ring-2 focus:ring-[#5C19C3]" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-300 mb-2">
                  Subject
                </label>
                <input type="text" id="subject" name="subject" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg text-neutral-50 focus:outline-none focus:ring-2 focus:ring-[#5C19C3]" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                  Message
                </label>
                <textarea id="message" name="message" rows="5" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg text-neutral-50 focus:outline-none focus:ring-2 focus:ring-[#5C19C3]"></textarea>
              </div>
              <button type="submit" className="w-full py-3 bg-[#5C19C3] rounded-xl text-white font-semibold hover:opacity-90 transition-opacity">
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
