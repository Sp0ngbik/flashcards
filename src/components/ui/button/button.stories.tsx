import type { Meta, StoryObj } from '@storybook/react'

import { LogOut } from '@/assets'
import { Button } from '@/components/ui/button'

const meta = {
  argTypes: {
    fullWidth: {
      control: { type: 'radio' },
      options: [true, false],
    },
    icon: {
      control: { type: 'radio' },
      options: [true, false],
    },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary', 'link'],
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    disabled: false,
    variant: 'primary',
  },
}

export const PrimaryWithIcon: Story = {
  args: {
    children: 'Primary Button With Icon',
    disabled: false,
    icon: <LogOut />,
    variant: 'primary',
  },
}
export const PrimaryDisabled: Story = {
  args: {
    children: 'Secondary Disabled',
    disabled: true,
  },
}
export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    disabled: false,
    variant: 'secondary',
  },
}
export const SecondaryDisabled: Story = {
  args: {
    children: 'Secondary Disabled',
    disabled: true,
    variant: 'secondary',
  },
}

export const SecondaryWithIcon: Story = {
  args: {
    children: 'Secondary Button With Icon',
    disabled: false,
    icon: <LogOut />,
    variant: 'secondary',
  },
}

export const Tertiary: Story = {
  args: {
    children: 'Tertiary Button',
    disabled: false,
    variant: 'tertiary',
  },
}
export const Link: Story = {
  args: {
    children: 'Tertiary Button',
    disabled: false,
    variant: 'link',
  },
}

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    disabled: false,
    fullWidth: true,
    variant: 'primary',
  },
}

export const AsLink: Story = {
  args: {
    as: 'a',
    children: 'Link that looks like a button',
    variant: 'primary',
  },
}
