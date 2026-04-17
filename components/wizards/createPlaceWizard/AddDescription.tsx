import AppTextInput from '@/components/appComponents/AppTextInput';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Theme } from '@/styles/Theme';
import { UpdateStep, VendorPlaceDetailsDto } from '@/types/open-api';
import { Dispatch, SetStateAction, useState } from 'react';
import { useApi } from '@/utils/api';
import WizardController from '@/components/wizards/WizardController';
import { useWizardContext } from '@/components/wizards/Wizard';
import AppView from '@/components/appComponents/AppView';

export default function AddDescription({ data, setData }: {
  data: VendorPlaceDetailsDto | undefined
  setData: Dispatch<SetStateAction<VendorPlaceDetailsDto | undefined>>

}) {

  const [description, setDescription] = useState<string | undefined>(data?.description);
  const API = useApi().api;
  const wizard = useWizardContext();

  const updatePlace = async () => {
    if (data?.id) {
      try {
        const res = await API.placesControllerUpdatePlace({
          id: data.id,
          updateStep: UpdateStep.AddDescription,
          description: description,
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleNextStep = async () => {
    await updatePlace();
    wizard.nextStep();

  };

  return (
    <>
      <AppView withPadding>

        <ScrollView>
          <Text style={styles.title}>Add Description</Text>

          <AppTextInput name="description"
                        value={data?.description}
                        onChange={(text) => setDescription(text)}
                        design={1}
                        textArea
                        label="Description"
                        placeholder="Add your description to your place"


          />
        </ScrollView>


        <WizardController onNext={handleNextStep} isFirstStep={false}
                          isLastStep={false} />
      </AppView>
    </>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: Theme.sizes.xl,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 50,
    width: '100%',
  },
  button: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginVertical: 30,
    marginHorizontal: 15,

  },
});