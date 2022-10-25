import * as React from "react";
import { AppShell, Navbar, ScrollArea } from "@mantine/core";
import MyHeader from "../components/MyHeader";
import SubaccountPreviewButton, {
  SubaccountPreview,
} from "../components/SubaccountPreviewButton";
import { useQuery } from "@tanstack/react-query";
import SubaccountView from "../components/SubaccountView";

// Create 10 fake accounts with email "user@example.com"
const fakeSubaccounts: SubaccountPreview[] = Array.from(
  { length: 10 },
  (_, i) => ({
    id: i,
    name: `Subaccount ${i}`,
    email: "user@example.com",
  })
);

function HomePage() {
  const [selectedSubaccountId, setSelectedSubaccountId] =
    React.useState<number>();

  const {
    data: subaccounts,
    isLoading,
    isFetching,
    error,
  } = useQuery(["subaccounts"], () =>
    fetch("https://google.com").then((res) => fakeSubaccounts)
  );

  const handleSelect = (id: number) => {
    setSelectedSubaccountId(id);
  };

  return (
    <AppShell
      className="min-h-screen bg-slate-800 text-slate-100"
      header={<MyHeader />}
      navbar={
        <Navbar width={{ base: 384 }} className="border-none bg-slate-700">
          <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
            <div className="flex flex-col pt-4">
              {fakeSubaccounts.map((subaccount) => (
                <SubaccountPreviewButton
                  selected={selectedSubaccountId === subaccount.id}
                  onSelect={() => handleSelect(subaccount.id)}
                  subaccountPreview={subaccount}
                />
              ))}
            </div>
          </Navbar.Section>
        </Navbar>
      }
    >
      <SubaccountView subaccountId={selectedSubaccountId} />
    </AppShell>
  );
}

export default HomePage;
// Create 10 subaccounts
