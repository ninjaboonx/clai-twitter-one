"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Twitter } from "lucide-react"
import { useRouter } from "next/navigation"

type Account = {
  label: string
  username: string
  icon?: React.ReactNode
}

const accounts: Account[] = [
  {
    label: "Personal",
    username: "@johndoe",
    icon: (
      <Avatar className="h-6 w-6">
        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@johndoe" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    ),
  },
  {
    label: "Work",
    username: "@acmecorp",
    icon: (
      <Avatar className="h-6 w-6">
        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@acmecorp" />
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
    ),
  },
]

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface AccountSwitcherProps extends PopoverTriggerProps {}

export function AccountSwitcher({ className }: AccountSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedAccount, setSelectedAccount] = React.useState<Account>(accounts[0])
  const router = useRouter()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select an account"
          className={cn("w-[200px] justify-between", className)}
        >
          {selectedAccount.icon}
          <span className="ml-2">{selectedAccount.username}</span>
          <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search accounts..." />
            <CommandEmpty>No accounts found.</CommandEmpty>
            <CommandGroup heading="Accounts">
              {accounts.map((account) => (
                <CommandItem
                  key={account.username}
                  onSelect={() => {
                    setSelectedAccount(account)
                    setOpen(false)
                  }}
                  className="text-sm"
                >
                  {account.icon}
                  <span className="ml-2">{account.username}</span>
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedAccount.username === account.username ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  router.push("/settings/accounts")
                }}
              >
                <PlusCircledIcon className="mr-2 h-5 w-5" />
                Manage Accounts
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  router.push("/api/auth/twitter")
                }}
              >
                <Twitter className="mr-2 h-5 w-5" />
                Connect Twitter Account
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
