import { FieldErrorsImpl } from 'react-hook-form';

export const handleError = (toast: any) => {
  return (data: FieldErrorsImpl) => {
    if (Object.keys(data).length > 0) {
      toast.error({
        title: 'Please fill in all required fields',
        iconName: 'alert',
      });
    }
  }
}