import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Radio, Rating, Slider, Stack, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

function sliderValuetext(sliderValue) {
  return `$${sliderValue}`;
}
const minDistance = 50;

export default function FiltersPanel({ categories, appliedFilters, onApply, onClose }) {

  const { t } = useTranslation();
  const theme = useTheme();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: appliedFilters,
  });

  useEffect(() => {
    reset(appliedFilters);
  }, [appliedFilters, reset]);

  const onSubmit = (formValues) => {
    onApply(formValues);
    onClose?.();
  };

  const handleReset = () => reset(appliedFilters);


  return <Box sx={{ width: 250, p: 2 }}>
    <Stack sx={{ gap: 4 }} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant='h4' sx={{ textTransform: 'capitalize', fontWeight: 600, color: 'text.primary' }}>
        {t('filters')}
      </Typography>

      <Stack>
        <Typography variant='p' sx={{ textTransform: 'capitalize', color: 'secondary.main' }}>{t('category')}</Typography>
        <FormControl>
          <FormGroup>
            {categories?.response?.data?.map((category) => (
              <Controller key={category.id} name='categoryIds' control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox
                      color='secondary'
                      checked={field.value.includes(category.id)}
                      onChange={(e) => {
                        field.onChange(
                          e.target.checked
                            ? [...field.value, category.id]
                            : field.value.filter((id) => id !== category.id)
                        );
                      }} />}
                    label={category.name} />
                )}
              />

            ))}
          </FormGroup>
        </FormControl>
      </Stack>

      <Stack spacing={2}>
        <Typography variant='p' sx={{ textTransform: 'capitalize', color: 'secondary.main' }}>{t('price range')}</Typography>
        <Controller
          name="priceRange"
          control={control}
          render={({ field }) => (
            <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
              <Typography variant='span' sx={{ fontSize: '0.8rem' }}> $10</Typography>
              <Box sx={{ width: 300 }}>
                <Slider
                  color='secondary'
                  size="small"
                  getAriaLabel={() => 'Minimum distance'}
                  value={field.value}
                  onChange={(event, newValue, activeThumb) => {
                    if (activeThumb === 0) {
                      field.onChange([Math.min(newValue[0], field.value[1] - minDistance), field.value[1]]);
                    } else {
                      field.onChange([field.value[0], Math.max(newValue[1], field.value[0] + minDistance)]);
                    }
                  }}
                  valueLabelDisplay="auto"
                  getAriaValueText={sliderValuetext}
                  disableSwap
                  min={10}
                  max={500}
                  step={10}
                />
              </Box>
              <Typography variant='span' sx={{ fontSize: '0.8rem' }}> $500</Typography>
            </Stack>
          )} />
      </Stack>

      <Stack spacing={2}>
        <Typography variant='p' sx={{ textTransform: 'capitalize', color: 'secondary.main' }}>{t('rating')}</Typography>
        <Controller
          name="ratingSelected"
          control={control}
          render={({ field: ratingSelectedField }) => (
            <Controller
              name="ratingVal"
              control={control}
              render={({ field: ratingValField }) => (
                <FormControlLabel
                  value="rating"
                  control={
                    <Radio
                      color='secondary'
                      size="small"
                      checked={ratingSelectedField.value}
                      onClick={() => ratingSelectedField.onChange(!ratingSelectedField.value)}
                    />
                  }
                  label={
                    <Stack direction='row' sx={{ alignItems: 'center', gap: 0.5 }}>
                      <Rating
                        name="simple-controlled"
                        value={ratingValField.value}
                        onChange={(event, newValue) => {
                          ratingValField.onChange(newValue);
                        }}
                      />
                      <Typography variant='span'> {t('& Up')}</Typography>
                    </Stack>
                  }
                />
              )}
            />
          )}
        />
      </Stack>

      <Stack direction="row" spacing={1}>
        <Button variant='outlined' color='secondary' type='button' onClick={handleReset} sx={{ textTransform: 'none' }} fullWidth>
          {t('reset')}
        </Button>

        <Button variant='contained' type='submit'
          sx={{
            bgcolor: 'secondary.main', color: 'secondary.contrastText', textTransform: 'none',
            '&:hover': {
              bgcolor: 'secondary.dark',
              transform: 'translateY(-2px)',
              boxShadow: theme.shadows[2],
            }
          }} fullWidth>{t('save')}</Button>
      </Stack>

    </Stack>
  </Box>
}
