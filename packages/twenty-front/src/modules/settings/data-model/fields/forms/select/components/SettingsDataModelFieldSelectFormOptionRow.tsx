import { FieldMetadataItemOption } from '@/object-metadata/types/FieldMetadataItem';
import { AdvancedSettingsWrapper } from '@/settings/components/AdvancedSettingsWrapper';
import { OPTION_VALUE_MAXIMUM_LENGTH } from '@/settings/data-model/constants/OptionValueMaximumLength';
import { TextInput } from '@/ui/input/components/TextInput';
import { Dropdown } from '@/ui/layout/dropdown/components/Dropdown';
import { DropdownContent } from '@/ui/layout/dropdown/components/DropdownContent';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { useCloseDropdown } from '@/ui/layout/dropdown/hooks/useCloseDropdown';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { t } from '@lingui/core/macro';
import {
  ColorSample,
  IconCheck,
  IconDotsVertical,
  IconGripVertical,
  IconTrash,
  IconX,
} from 'twenty-ui/display';
import { LightIconButton } from 'twenty-ui/input';
import { MenuItem, MenuItemSelectColor } from 'twenty-ui/navigation';
import { MAIN_COLOR_NAMES } from 'twenty-ui/theme';
import { computeOptionValueFromLabel } from '~/pages/settings/data-model/utils/compute-option-value-from-label.utils';

type SettingsDataModelFieldSelectFormOptionRowProps = {
  className?: string;
  isDefault?: boolean;
  onChange: (value: FieldMetadataItemOption) => void;
  onRemove?: () => void;
  onSetAsDefault?: () => void;
  onRemoveAsDefault?: () => void;
  onInputEnter?: () => void;
  option: FieldMetadataItemOption;
  isNewRow?: boolean;
};

const StyledRow = styled.div`
  align-items: center;
  display: flex;
  height: ${({ theme }) => theme.spacing(6)};
  padding: ${({ theme }) => theme.spacing(1.5)} 0;
`;

const StyledColorSample = styled(ColorSample)`
  cursor: pointer;
  margin-top: ${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme }) => theme.spacing(1)};

  margin-right: ${({ theme }) => theme.spacing(3.5)};
  margin-left: ${({ theme }) => theme.spacing(3.5)};
`;

const StyledOptionInput = styled(TextInput)`
  flex-grow: 1;
  width: 100%;
  & input {
    height: ${({ theme }) => theme.spacing(6)};
  }
`;

const StyledIconGripVertical = styled(IconGripVertical)`
  margin-right: ${({ theme }) => theme.spacing(0.75)};
`;

const StyledLightIconButton = styled(LightIconButton)`
  margin-left: ${({ theme }) => theme.spacing(2)};
`;

export const SettingsDataModelFieldSelectFormOptionRow = ({
  className,
  isDefault,
  onChange,
  onRemove,
  onSetAsDefault,
  onRemoveAsDefault,
  onInputEnter,
  option,
  isNewRow,
}: SettingsDataModelFieldSelectFormOptionRowProps) => {
  const theme = useTheme();

  const SELECT_COLOR_DROPDOWN_ID = `select-color-dropdown-${option.id}`;
  const SELECT_ACTIONS_DROPDOWN_ID = `select-actions-dropdown-${option.id}`;

  const { closeDropdown: closeColorDropdown } = useCloseDropdown();
  const { closeDropdown: closeActionsDropdown } = useCloseDropdown();

  const handleInputEnter = () => {
    onInputEnter?.();
  };

  return (
    <StyledRow className={className}>
      <StyledIconGripVertical
        style={{ minWidth: theme.icon.size.md }}
        size={theme.icon.size.md}
        stroke={theme.icon.stroke.sm}
        color={theme.font.color.extraLight}
      />
      <AdvancedSettingsWrapper animationDimension="width" hideDot>
        <StyledOptionInput
          instanceId={`select-option-value-${option.id}`}
          value={option.value}
          onChange={(input) =>
            onChange({
              ...option,
              value: computeOptionValueFromLabel(input),
            })
          }
          RightIcon={isDefault ? IconCheck : undefined}
          maxLength={OPTION_VALUE_MAXIMUM_LENGTH}
        />
      </AdvancedSettingsWrapper>
      <Dropdown
        dropdownId={SELECT_COLOR_DROPDOWN_ID}
        dropdownPlacement="bottom-start"
        clickableComponent={<StyledColorSample colorName={option.color} />}
        dropdownComponents={
          <DropdownContent>
            <DropdownMenuItemsContainer>
              {MAIN_COLOR_NAMES.map((colorName) => (
                <MenuItemSelectColor
                  key={colorName}
                  onClick={() => {
                    onChange({ ...option, color: colorName });
                    closeColorDropdown(SELECT_COLOR_DROPDOWN_ID);
                  }}
                  color={colorName}
                  selected={colorName === option.color}
                />
              ))}
            </DropdownMenuItemsContainer>
          </DropdownContent>
        }
      />
      <StyledOptionInput
        instanceId={`select-option-label-${option.id}`}
        value={option.label}
        onChange={(label) => {
          const optionNameHasBeenEdited = !(
            option.value === computeOptionValueFromLabel(option.label)
          );
          onChange({
            ...option,
            label,
            value: optionNameHasBeenEdited
              ? option.value
              : computeOptionValueFromLabel(label),
          });
        }}
        RightIcon={isDefault ? IconCheck : undefined}
        maxLength={OPTION_VALUE_MAXIMUM_LENGTH}
        onInputEnter={handleInputEnter}
        autoFocusOnMount={isNewRow}
        autoSelectOnMount={isNewRow}
      />
      <Dropdown
        dropdownId={SELECT_ACTIONS_DROPDOWN_ID}
        dropdownPlacement="right-start"
        clickableComponent={
          <StyledLightIconButton accent="tertiary" Icon={IconDotsVertical} />
        }
        dropdownComponents={
          <DropdownContent>
            <DropdownMenuItemsContainer>
              {isDefault ? (
                <MenuItem
                  LeftIcon={IconX}
                  text={t`Remove as default`}
                  onClick={() => {
                    onRemoveAsDefault?.();
                    closeActionsDropdown(SELECT_ACTIONS_DROPDOWN_ID);
                  }}
                />
              ) : (
                <MenuItem
                  LeftIcon={IconCheck}
                  text={t`Set as default`}
                  onClick={() => {
                    onSetAsDefault?.();
                    closeActionsDropdown(SELECT_ACTIONS_DROPDOWN_ID);
                  }}
                />
              )}
              {!!onRemove && !isDefault && (
                <MenuItem
                  accent="danger"
                  LeftIcon={IconTrash}
                  text={t`Remove option`}
                  onClick={() => {
                    onRemove();
                    closeActionsDropdown(SELECT_ACTIONS_DROPDOWN_ID);
                  }}
                />
              )}
            </DropdownMenuItemsContainer>
          </DropdownContent>
        }
      />
    </StyledRow>
  );
};
