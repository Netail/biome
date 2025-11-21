use biome_analyze::{
    Ast, Rule, RuleDiagnostic, RuleDomain, RuleSource, context::RuleContext, declare_lint_rule,
};
use biome_console::markup;
use biome_js_syntax::{JsStringLiteralExpression, JsTemplateExpression, JsxAttribute};
use biome_rowan::{AstNode, declare_node_union};
use biome_rule_options::no_script_url::NoScriptUrlOptions;

declare_lint_rule! {
    /// Disallow javascript: URLs.
    ///
    /// javascript: URLs are a form of XSS attack.
    /// They allow an attacker to execute arbitrary JavaScript in the context of your website, which can be used to steal user data, deface your website, or perform other malicious actions.
    ///
    /// ## Examples
    ///
    /// ### Invalid
    ///
    /// ```js,expect_diagnostic
    /// var a = 1;
    /// a = 2;
    /// ```
    ///
    /// ### Valid
    ///
    /// ```js
    /// // var a = 1;
    /// ```
    ///
    pub NoScriptUrl {
        version: "next",
        name: "noScriptUrl",
        language: "js",
        recommended: false,
        domains: &[RuleDomain::React, RuleDomain::Qwik, RuleDomain::Solid],
        sources: &[RuleSource::Eslint("no-script-url").same(), RuleSource::EslintReact("jsx-no-script-url").same(), RuleSource::EslintQwik("jsx-no-script-url").same(), RuleSource::EslintSolid("jsx-no-script-url").same(), RuleSource::EslintReactDom("no-script-url").same(), RuleSource::EslintReactXyz("dom/no-script-url").same()],
    }
}

impl Rule for NoScriptUrl {
    type Query = Ast<NoScriptUrlQuery>;
    type State = ();
    type Signals = Option<Self::State>;
    type Options = NoScriptUrlOptions;

    fn run(ctx: &RuleContext<Self>) -> Self::Signals {
        let _binding = ctx.query();
        Some(())
    }

    fn diagnostic(ctx: &RuleContext<Self>, _state: &Self::State) -> Option<RuleDiagnostic> {
        let node = ctx.query();
        Some(
            RuleDiagnostic::new(
                rule_category!(),
                node.range(),
                markup! {
                    "Variable is read here."
                },
            )
            .note(markup! {
                "This note will give you more information."
            }),
        )
    }
}

declare_node_union! {
    pub NoScriptUrlQuery = JsStringLiteralExpression | JsTemplateExpression | JsxAttribute
}

fn check_value() {}
