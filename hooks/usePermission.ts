import _ from 'lodash';

const usePermission = (session: any) => {
  try {
    const roles = _.map(_.get(session, 'user'));
    const rolesArr = _.last(roles);
    console.log('rolesArr:', rolesArr);
    const toCheck = ['admin', 'cohort', 'member'];
    if (!roles) return '';
    const canEdit = toCheck.every((role) => roles.includes(role));
    return canEdit;
  } catch (error) {
    console.error({ error });
  }
};

export default usePermission;
