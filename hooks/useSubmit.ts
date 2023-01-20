import useApplicationCreate from './useApplicationCreate';
import useCreateConsult from './useCreateConsult';
import {
  mapBudgetOptions,
  mapProjectType,
  mapConsultationService,
  mapAvailableProjectSpec,
  mapSkill,
  mapSkillType,
  mapAvailability,
  mapDAOFamiliarity,
} from '../utils/mapping';

const useSubmit = (token: string) => {
  const { mutateAsync } = useApplicationCreate(token);
  const { mutateAsync: mutateConsult } = useCreateConsult(token);

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

  const submitHireForm = async (data: any) => {
    const servicesRequried = [
      ...data.hire3.services.map((s: string) => ({ guild_service_key: mapConsultationService(s) })),
    ];
    const submitData = {
      // 1-Contact.tsx
      name: data.hire1.name,
      consultation_contact: {
        data: {
          email: data.hire1.email,
          bio: data.hire1.bio,
          discord: data.hire1.discord,
          github: data.hire1.github,
          twitter: data.hire1.twitter,
          telegram: data.hire1.telegram,
        },
      },
      // 2-ProjectOverview.tsx
      type_key: mapProjectType(data.hire2.projectType),
      specs_key: mapAvailableProjectSpec(data.hire2.specsType),
      project_name: data.hire2.projectName,
      project_description: data.hire2.projectDescription,
      // 3-Services.tsx
      consultation_services_required: {
        data: [...servicesRequried],
      },
      budget_option_key: mapBudgetOptions(data.hire3.budget),
      expected_deadline: data.hire3.expectedDeadline,
      // 4-ProjectDetails.tsx
      specific_need: data.hire4.specificNeed,
      priorities: data.hire4.priorities,
    };
    const res = await mutateAsync({ ...submitData });
    return res;
  };
  return {
    submitJoinForm,
    submitHireForm,
  };
};

export default useSubmit;
