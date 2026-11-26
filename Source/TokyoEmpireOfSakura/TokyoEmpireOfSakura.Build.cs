using UnrealBuildTool;

public class TokyoEmpireOfSakura : ModuleRules
{
    public TokyoEmpireOfSakura(ReadOnlyTargetRules Target) : base(Target)
    {
        PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;
        PublicDependencyModuleNames.AddRange(new string[]
        {
            "Core", "CoreUObject", "Engine", "InputCore", "EnhancedInput",
            "GameplayTags", "AIModule", "NavigationSystem", "UMG"
        });
        PrivateDependencyModuleNames.AddRange(new string[] { "Slate", "SlateCore" });
    }
}
