use biome_analyze::{
    Ast, Rule, RuleDiagnostic, RuleSource, context::RuleContext, declare_lint_rule,
};
use biome_console::markup;
use biome_css_syntax::CssRoot;
use biome_rowan::{AstNode, Direction, TextRange};
use biome_rule_options::no_empty_documentation::NoEmptyDocumentationOptions;

declare_lint_rule! {
    /// Disallow empty comments
    ///
    /// ## Examples
    ///
    /// ### Invalid
    ///
    /// ```css,expect_diagnostic
    /// /**/
    /// ```
    ///
    /// ```css,expect_diagnostic
    /// /* */
    /// ```
    ///
    /// ```css,expect_diagnostic
    /// /*
    ///
    ///  */
    /// ```
    ///
    /// ### Valid
    ///
    /// ```css
    /// /* comment */
    /// ```
    ///
    /// ```css
    /// /*
    ///  * Multi-line Comment
    /// **/
    /// ```
    ///
    pub NoEmptyDocumentation {
        version: "next",
        name: "noEmptyDocumentation",
        language: "css",
        recommended: false,
        sources: &[RuleSource::Stylelint("comment-no-empty").same()],
    }
}

impl Rule for NoEmptyDocumentation {
    type Query = Ast<CssRoot>;
    type State = Vec<TextRange>;
    type Signals = Option<Self::State>;
    type Options = NoEmptyDocumentationOptions;

    fn run(ctx: &RuleContext<Self>) -> Option<Self::State> {
        let node = ctx.query();

        let mut tokens = vec![];
        for token in node.syntax().descendants_tokens(Direction::Next) {
            let leading_trivia = token.leading_trivia();
            let comments: Vec<_> = leading_trivia
                .pieces()
                .filter_map(|trivia| {
                    if let Some(comments) = trivia.as_comments() {
                        if () {
                            return Some(comments.text_range());
                        }
                    }
                    None
                })
                .collect();

            tokens.extend(comments);
        }

        Some(tokens)
    }

    fn diagnostic(ctx: &RuleContext<Self>, _state: &Self::State) -> Option<RuleDiagnostic> {
        let span = ctx.query().range();
        Some(
            RuleDiagnostic::new(
                rule_category!(),
                span,
                markup! {
                    "Unexpected empty comment"
                },
            )
            .note(markup! {
                    ""
            }),
        )
    }
}
