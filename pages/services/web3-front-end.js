import ServicePageTemplate from "../../components/page-templates/ServicePageTemplate";

export default function Page(props) {
  return (
    <>
      <ServicePageTemplate
        pageTitle={"Web3 Front End"}
        pageDescription={PageDescription}
        roleImage={RoleImage}
        salesContent={SalesContent}
      />
    </>
  );
}

const PageDescription =
  "I'm baby lyft synth salvia, waistcoat hexagon humblebrag man bun JOMO hot chicken roof party. Gentrify same heirloom skateboard. Sustainable mukbang next level, fanny pack kinfolk kickstarter freegan pitchfork lo-fi small batch swag farm-to-table disrupt pug. Paleo mlkshk quinoa kitsch kogi. Umami tilde tacos yes plz shaman. Yes plz tote bag try-hard letterpress flannel hashtag messenger bag brunch twee activated charcoal williamsburg. IPhone seitan mlkshk polaroid helvetica pitchfork praxis.";

const RoleImage = "/assets/illustrations/warrior.png";

const SalesContent =
  "Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb. The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.";
