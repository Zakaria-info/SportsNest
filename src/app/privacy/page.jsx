const PrivacyPage = () => {
  return (
    <div className="max-w-4xl mx-auto mt-20 px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-600 mb-4">
        SportsNest is committed to protecting your privacy. This page describes
        how we collect, use, and safeguard your information when you use our
        website.
      </p>
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
          <p className="text-gray-600">
            We collect only the data required to create and manage your account,
            process bookings, and provide support. This may include email,
            name, and booking details.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">How We Use Your Data</h2>
          <p className="text-gray-600">
            Your information is used to authenticate you, manage your bookings,
            and improve your experience. We do not sell your data to third
            parties.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Contact</h2>
          <p className="text-gray-600">
            If you have questions about your privacy or our policies, please
            contact support@sportsnest.com.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
