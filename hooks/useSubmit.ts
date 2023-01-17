import useApplicationCreate from './useApplicationCreate';
import { mapSkill, mapSkillType, mapAvailability, mapDAOFamiliarity } from '../utils/mapping';

const useSubmit = (token: string) => {
  const { mutateAsync } = useApplicationCreate(token);

  const submitJoinForm = async (data: any) => {
    const applicationSkills = [
      ...data.join3.primarySkills.map((s: string) => ({ skill_key: mapSkill(s), skill_type_key: 'PRIMARY' })),
      ...data.join3.secondarySkills.map((s: string) => ({ skill_key: mapSkill(s), skill_type_key: 'SECONDARY' })),
    ];
    const submitData = {
      name: data.join1.name,
      eth_address: data.join6.ethAddress,
      introduction: data.join1.introduction,
      learning_goals: data.join1.learningGoals,
      technical_skill_type_key: mapSkillType(data.join3.technicalSkillType),
      passion: data.join4.passion,
      favorite_media: data.join4.favoriteMedia,
      crypto_thrills: data.join4.cryptoThrills,
      why_raidguild: data.join4.whyRaidguild,
      dao_familiarity_key: mapDAOFamiliarity(data.join5.daoFamiliarity),
      availability_key: mapAvailability(data.join5.cohortAvailability),
      applications_skills: {
        data: [...applicationSkills],
      },
      contact_info: {
        data: {
          discord: data.join2.discord,
          email: data.join1.email,
          github: data.join2.github,
          telegram: data.join2.telegram,
          twitter: data.join2.twitter,
        },
      },
      crypto_experience: data.join5.cryptoExperience,
      comments: data.join5.comments,
      handbook_read: data.join6.handbookRead,
      pledge_readiness: data.join6.pledgeReadiness,
    };
    const res = await mutateAsync({ ...submitData });
    return res;
  };
  return {
    submitJoinForm,
  };
};

export default useSubmit;
