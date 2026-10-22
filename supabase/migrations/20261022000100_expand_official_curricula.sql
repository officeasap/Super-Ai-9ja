with seed (id, course_id, title, description, seed_order, is_published) as (
values
  ('sai-ai-literacy-enterprise-upskilling-lesson-01', 'sai-ai-literacy-enterprise-upskilling', 'Understand Artificial Intelligence', 'Distinguish AI, machine learning, deep learning, and generative AI.', 1, true),
  ('sai-ai-literacy-enterprise-upskilling-lesson-02', 'sai-ai-literacy-enterprise-upskilling', 'How AI Systems Learn', 'Understand training data, model patterns, inference, and limitations.', 2, true),
  ('sai-ai-literacy-enterprise-upskilling-lesson-03', 'sai-ai-literacy-enterprise-upskilling', 'Prompting and AI Workflows', 'Create clear instructions, context, constraints, and output criteria.', 3, true),
  ('sai-ai-literacy-enterprise-upskilling-lesson-04', 'sai-ai-literacy-enterprise-upskilling', 'Verify AI Outputs', 'Check accuracy, sources, bias, uncertainty, and fabricated claims.', 4, true),
  ('sai-ai-literacy-enterprise-upskilling-lesson-05', 'sai-ai-literacy-enterprise-upskilling', 'Responsible AI at Work', 'Apply privacy, consent, fairness, security, and human oversight.', 5, true),
  ('sai-ai-literacy-enterprise-upskilling-lesson-06', 'sai-ai-literacy-enterprise-upskilling', 'AI Productivity Capstone', 'Design and evaluate a useful, responsible AI-assisted workflow.', 6, true),
  ('sai-python-programming-lesson-01', 'sai-python-programming', 'Set Up Python and Run Your First Program', 'Understand the interpreter, scripts, execution, and error messages.', 1, true),
  ('sai-python-programming-lesson-02', 'sai-python-programming', 'Variables, Types, and Expressions', 'Use strings, numbers, booleans, conversion, and operators.', 2, true),
  ('sai-python-programming-lesson-03', 'sai-python-programming', 'Conditions and Loops', 'Control program flow with decisions, iteration, and loop conditions.', 3, true),
  ('sai-python-programming-lesson-04', 'sai-python-programming', 'Functions and Data Structures', 'Build reusable functions and work with lists, dictionaries, and sets.', 4, true),
  ('sai-python-programming-lesson-05', 'sai-python-programming', 'Files, Exceptions, and Modules', 'Read and write files, handle failures, and organise reusable code.', 5, true),
  ('sai-python-programming-lesson-06', 'sai-python-programming', 'Build a Practical Python Project', 'Plan, implement, test, document, and improve a small application.', 6, true),
  ('sai-cybersecurity-ai-safety-lesson-01', 'sai-cybersecurity-ai-safety', 'Security Foundations and Threat Modelling', 'Identify assets, threat actors, attack surfaces, and likely impact.', 1, true),
  ('sai-cybersecurity-ai-safety-lesson-02', 'sai-cybersecurity-ai-safety', 'Passwords, Identity, and Access Control', 'Apply multifactor authentication, least privilege, and secure recovery.', 2, true),
  ('sai-cybersecurity-ai-safety-lesson-03', 'sai-cybersecurity-ai-safety', 'Phishing, Social Engineering, and Scams', 'Assess suspicious messages, links, requests, and impersonation.', 3, true),
  ('sai-cybersecurity-ai-safety-lesson-04', 'sai-cybersecurity-ai-safety', 'Secure Data and Applications', 'Apply data minimisation, safe handling, updates, and input validation.', 4, true),
  ('sai-cybersecurity-ai-safety-lesson-05', 'sai-cybersecurity-ai-safety', 'AI Threats, Deepfakes, and Prompt Injection', 'Recognise AI-enabled abuse and defend against untrusted instructions.', 5, true),
  ('sai-cybersecurity-ai-safety-lesson-06', 'sai-cybersecurity-ai-safety', 'Incident Response Capstone', 'Create a proportionate detection, containment, recovery, and reporting plan.', 6, true),
  ('sai-deep-learning-lesson-01', 'sai-deep-learning', 'Neural Networks and Tensors', 'Understand model inputs, layers, parameters, activations, and outputs.', 1, true),
  ('sai-deep-learning-lesson-02', 'sai-deep-learning', 'Forward Pass and Loss Functions', 'Trace predictions and measure errors with suitable objective functions.', 2, true),
  ('sai-deep-learning-lesson-03', 'sai-deep-learning', 'Gradients and Backpropagation', 'Explain how gradients inform parameter updates during training.', 3, true),
  ('sai-deep-learning-lesson-04', 'sai-deep-learning', 'Training, Optimisation, and Generalisation', 'Use learning rates, validation, regularisation, and learning curves.', 4, true),
  ('sai-deep-learning-lesson-05', 'sai-deep-learning', 'Build and Evaluate a Neural Network', 'Prepare data, train a baseline, measure results, and inspect errors.', 5, true),
  ('sai-deep-learning-lesson-06', 'sai-deep-learning', 'Deep Learning Project and Model Card', 'Document data, intended use, limitations, evaluation, and responsible deployment.', 6, true),
  ('sai-ai-agents-workflow-automation-lesson-01', 'sai-ai-agents-workflow-automation', 'From Chatbots to Agents', 'Distinguish generated responses from systems that plan and use tools.', 1, true),
  ('sai-ai-agents-workflow-automation-lesson-02', 'sai-ai-agents-workflow-automation', 'Tools, Instructions, and Structured Outputs', 'Define constrained tool interfaces, schemas, and clear task boundaries.', 2, true),
  ('sai-ai-agents-workflow-automation-lesson-03', 'sai-ai-agents-workflow-automation', 'Planning, State, and Memory', 'Design task steps, explicit state, context handling, and recovery paths.', 3, true),
  ('sai-ai-agents-workflow-automation-lesson-04', 'sai-ai-agents-workflow-automation', 'Safe Tool Use and Human Approval', 'Limit permissions and require confirmation for consequential actions.', 4, true),
  ('sai-ai-agents-workflow-automation-lesson-05', 'sai-ai-agents-workflow-automation', 'Build and Test an Automated Workflow', 'Implement a bounded workflow and test failures, retries, and edge cases.', 5, true),
  ('sai-ai-agents-workflow-automation-lesson-06', 'sai-ai-agents-workflow-automation', 'Agent Capstone and Evaluation', 'Measure reliability, cost, latency, security, and successful task completion.', 6, true),
  ('sai-hugging-face-llms-generative-ai-lesson-01', 'sai-hugging-face-llms-generative-ai', 'LLM Foundations and Tokenisation', 'Understand tokens, context windows, model inputs, and generated outputs.', 1, true),
  ('sai-hugging-face-llms-generative-ai-lesson-02', 'sai-hugging-face-llms-generative-ai', 'Transformers and Attention', 'Explain the role of attention and contextual representations.', 2, true),
  ('sai-hugging-face-llms-generative-ai-lesson-03', 'sai-hugging-face-llms-generative-ai', 'Model Selection and Inference', 'Compare model capabilities, deployment needs, latency, and cost.', 3, true),
  ('sai-hugging-face-llms-generative-ai-lesson-04', 'sai-hugging-face-llms-generative-ai', 'Hugging Face Models and Pipelines', 'Explore model cards, tokenisers, pipelines, and reproducible configuration.', 4, true),
  ('sai-hugging-face-llms-generative-ai-lesson-05', 'sai-hugging-face-llms-generative-ai', 'Retrieval-Augmented Generation', 'Connect relevant documents to responses and assess grounding quality.', 5, true),
  ('sai-hugging-face-llms-generative-ai-lesson-06', 'sai-hugging-face-llms-generative-ai', 'Build and Evaluate an LLM Application', 'Prototype a bounded application and evaluate factuality and failure modes.', 6, true),
  ('sai-nvidia-generative-ai-llms-lesson-01', 'sai-nvidia-generative-ai-llms', 'Generative AI Use Cases and Architecture', 'Match generative approaches to a problem and define system boundaries.', 1, true),
  ('sai-nvidia-generative-ai-llms-lesson-02', 'sai-nvidia-generative-ai-llms', 'Prompt Design and Output Constraints', 'Specify context, examples, format, refusal conditions, and quality criteria.', 2, true),
  ('sai-nvidia-generative-ai-llms-lesson-03', 'sai-nvidia-generative-ai-llms', 'Embeddings and Semantic Search', 'Represent text as vectors and retrieve semantically relevant material.', 3, true),
  ('sai-nvidia-generative-ai-llms-lesson-04', 'sai-nvidia-generative-ai-llms', 'Grounded Question Answering', 'Build a retrieval workflow and inspect evidence supporting each answer.', 4, true),
  ('sai-nvidia-generative-ai-llms-lesson-05', 'sai-nvidia-generative-ai-llms', 'Performance, Cost, and Deployment', 'Evaluate throughput, latency, resource needs, monitoring, and fallbacks.', 5, true),
  ('sai-nvidia-generative-ai-llms-lesson-06', 'sai-nvidia-generative-ai-llms', 'Generative AI Application Capstone', 'Deliver a tested prototype with documented risks and evaluation results.', 6, true),
  ('sai-applied-machine-learning-mlops-lesson-01', 'sai-applied-machine-learning-mlops', 'Frame a Machine Learning Problem', 'Define the target, baseline, data requirements, and success metric.', 1, true),
  ('sai-applied-machine-learning-mlops-lesson-02', 'sai-applied-machine-learning-mlops', 'Prepare Data and Prevent Leakage', 'Inspect missing values, splits, features, quality, and leakage risks.', 2, true),
  ('sai-applied-machine-learning-mlops-lesson-03', 'sai-applied-machine-learning-mlops', 'Train Baselines and Compare Models', 'Create reproducible experiments and compare suitable algorithms.', 3, true),
  ('sai-applied-machine-learning-mlops-lesson-04', 'sai-applied-machine-learning-mlops', 'Evaluate Models and Explain Errors', 'Use appropriate metrics, validation, error analysis, and threshold selection.', 4, true),
  ('sai-applied-machine-learning-mlops-lesson-05', 'sai-applied-machine-learning-mlops', 'Deploy and Monitor a Model', 'Plan serving, versioning, drift monitoring, rollback, and ownership.', 5, true),
  ('sai-applied-machine-learning-mlops-lesson-06', 'sai-applied-machine-learning-mlops', 'End-to-End MLOps Capstone', 'Produce a reproducible pipeline with evaluation and operational documentation.', 6, true)
)
insert into public.sai9ja_lessons
  (id, course_id, title, description, display_order, is_published)
select
  seed.id,
  seed.course_id,
  seed.title,
  seed.description,
  coalesce((
    select max(existing.display_order)
    from public.sai9ja_lessons as existing
    where existing.course_id = seed.course_id
  ), 0) + seed.seed_order,
  seed.is_published
from seed
on conflict (id) do nothing;

insert into public.sai9ja_lesson_content (lesson_id, content, video_url)
values
('sai-ai-literacy-enterprise-upskilling-lesson-01', '# Understand Artificial Intelligence

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Distinguish AI, machine learning, deep learning, and generative AI.

## Core concepts

This lesson is part of AI Literacy & Enterprise Upskilling. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Distinguish AI, machine learning, deep learning, and generative AI.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Understand Artificial Intelligence”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Distinguish AI, machine learning, deep learning, and generative AI.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-ai-literacy-enterprise-upskilling-lesson-02', '# How AI Systems Learn

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Understand training data, model patterns, inference, and limitations.

## Core concepts

This lesson is part of AI Literacy & Enterprise Upskilling. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Understand training data, model patterns, inference, and limitations.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “How AI Systems Learn”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Understand training data, model patterns, inference, and limitations.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-ai-literacy-enterprise-upskilling-lesson-03', '# Prompting and AI Workflows

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Create clear instructions, context, constraints, and output criteria.

## Core concepts

This lesson is part of AI Literacy & Enterprise Upskilling. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Create clear instructions, context, constraints, and output criteria.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Prompting and AI Workflows”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Create clear instructions, context, constraints, and output criteria.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-ai-literacy-enterprise-upskilling-lesson-04', '# Verify AI Outputs

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Check accuracy, sources, bias, uncertainty, and fabricated claims.

## Core concepts

This lesson is part of AI Literacy & Enterprise Upskilling. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Check accuracy, sources, bias, uncertainty, and fabricated claims.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Verify AI Outputs”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Check accuracy, sources, bias, uncertainty, and fabricated claims.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-ai-literacy-enterprise-upskilling-lesson-05', '# Responsible AI at Work

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Apply privacy, consent, fairness, security, and human oversight.

## Core concepts

This lesson is part of AI Literacy & Enterprise Upskilling. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Apply privacy, consent, fairness, security, and human oversight.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Responsible AI at Work”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Apply privacy, consent, fairness, security, and human oversight.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-ai-literacy-enterprise-upskilling-lesson-06', '# AI Productivity Capstone

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Design and evaluate a useful, responsible AI-assisted workflow.

## Core concepts

This lesson is part of AI Literacy & Enterprise Upskilling. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Design and evaluate a useful, responsible AI-assisted workflow.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “AI Productivity Capstone”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Design and evaluate a useful, responsible AI-assisted workflow.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-python-programming-lesson-01', '# Set Up Python and Run Your First Program

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Understand the interpreter, scripts, execution, and error messages.

## Core concepts

This lesson is part of Python Programming. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Understand the interpreter, scripts, execution, and error messages.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Set Up Python and Run Your First Program”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Understand the interpreter, scripts, execution, and error messages.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-python-programming-lesson-02', '# Variables, Types, and Expressions

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Use strings, numbers, booleans, conversion, and operators.

## Core concepts

This lesson is part of Python Programming. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Use strings, numbers, booleans, conversion, and operators.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Variables, Types, and Expressions”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Use strings, numbers, booleans, conversion, and operators.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-python-programming-lesson-03', '# Conditions and Loops

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Control program flow with decisions, iteration, and loop conditions.

## Core concepts

This lesson is part of Python Programming. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Control program flow with decisions, iteration, and loop conditions.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Conditions and Loops”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Control program flow with decisions, iteration, and loop conditions.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-python-programming-lesson-04', '# Functions and Data Structures

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Build reusable functions and work with lists, dictionaries, and sets.

## Core concepts

This lesson is part of Python Programming. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Build reusable functions and work with lists, dictionaries, and sets.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Functions and Data Structures”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Build reusable functions and work with lists, dictionaries, and sets.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-python-programming-lesson-05', '# Files, Exceptions, and Modules

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Read and write files, handle failures, and organise reusable code.

## Core concepts

This lesson is part of Python Programming. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Read and write files, handle failures, and organise reusable code.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Files, Exceptions, and Modules”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Read and write files, handle failures, and organise reusable code.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-python-programming-lesson-06', '# Build a Practical Python Project

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Plan, implement, test, document, and improve a small application.

## Core concepts

This lesson is part of Python Programming. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Plan, implement, test, document, and improve a small application.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Build a Practical Python Project”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Plan, implement, test, document, and improve a small application.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-cybersecurity-ai-safety-lesson-01', '# Security Foundations and Threat Modelling

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Identify assets, threat actors, attack surfaces, and likely impact.

## Core concepts

This lesson is part of Cybersecurity & AI Safety. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Identify assets, threat actors, attack surfaces, and likely impact.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Security Foundations and Threat Modelling”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Identify assets, threat actors, attack surfaces, and likely impact.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-cybersecurity-ai-safety-lesson-02', '# Passwords, Identity, and Access Control

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Apply multifactor authentication, least privilege, and secure recovery.

## Core concepts

This lesson is part of Cybersecurity & AI Safety. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Apply multifactor authentication, least privilege, and secure recovery.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Passwords, Identity, and Access Control”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Apply multifactor authentication, least privilege, and secure recovery.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-cybersecurity-ai-safety-lesson-03', '# Phishing, Social Engineering, and Scams

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Assess suspicious messages, links, requests, and impersonation.

## Core concepts

This lesson is part of Cybersecurity & AI Safety. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Assess suspicious messages, links, requests, and impersonation.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Phishing, Social Engineering, and Scams”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Assess suspicious messages, links, requests, and impersonation.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-cybersecurity-ai-safety-lesson-04', '# Secure Data and Applications

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Apply data minimisation, safe handling, updates, and input validation.

## Core concepts

This lesson is part of Cybersecurity & AI Safety. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Apply data minimisation, safe handling, updates, and input validation.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Secure Data and Applications”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Apply data minimisation, safe handling, updates, and input validation.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-cybersecurity-ai-safety-lesson-05', '# AI Threats, Deepfakes, and Prompt Injection

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Recognise AI-enabled abuse and defend against untrusted instructions.

## Core concepts

This lesson is part of Cybersecurity & AI Safety. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Recognise AI-enabled abuse and defend against untrusted instructions.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “AI Threats, Deepfakes, and Prompt Injection”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Recognise AI-enabled abuse and defend against untrusted instructions.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-cybersecurity-ai-safety-lesson-06', '# Incident Response Capstone

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Create a proportionate detection, containment, recovery, and reporting plan.

## Core concepts

This lesson is part of Cybersecurity & AI Safety. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Create a proportionate detection, containment, recovery, and reporting plan.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Incident Response Capstone”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Create a proportionate detection, containment, recovery, and reporting plan.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-deep-learning-lesson-01', '# Neural Networks and Tensors

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Understand model inputs, layers, parameters, activations, and outputs.

## Core concepts

This lesson is part of Deep Learning. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Understand model inputs, layers, parameters, activations, and outputs.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Neural Networks and Tensors”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Understand model inputs, layers, parameters, activations, and outputs.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-deep-learning-lesson-02', '# Forward Pass and Loss Functions

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Trace predictions and measure errors with suitable objective functions.

## Core concepts

This lesson is part of Deep Learning. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Trace predictions and measure errors with suitable objective functions.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Forward Pass and Loss Functions”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Trace predictions and measure errors with suitable objective functions.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-deep-learning-lesson-03', '# Gradients and Backpropagation

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Explain how gradients inform parameter updates during training.

## Core concepts

This lesson is part of Deep Learning. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Explain how gradients inform parameter updates during training.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Gradients and Backpropagation”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Explain how gradients inform parameter updates during training.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-deep-learning-lesson-04', '# Training, Optimisation, and Generalisation

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Use learning rates, validation, regularisation, and learning curves.

## Core concepts

This lesson is part of Deep Learning. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Use learning rates, validation, regularisation, and learning curves.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Training, Optimisation, and Generalisation”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Use learning rates, validation, regularisation, and learning curves.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-deep-learning-lesson-05', '# Build and Evaluate a Neural Network

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Prepare data, train a baseline, measure results, and inspect errors.

## Core concepts

This lesson is part of Deep Learning. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Prepare data, train a baseline, measure results, and inspect errors.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Build and Evaluate a Neural Network”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Prepare data, train a baseline, measure results, and inspect errors.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-deep-learning-lesson-06', '# Deep Learning Project and Model Card

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Document data, intended use, limitations, evaluation, and responsible deployment.

## Core concepts

This lesson is part of Deep Learning. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Document data, intended use, limitations, evaluation, and responsible deployment.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Deep Learning Project and Model Card”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Document data, intended use, limitations, evaluation, and responsible deployment.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-ai-agents-workflow-automation-lesson-01', '# From Chatbots to Agents

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Distinguish generated responses from systems that plan and use tools.

## Core concepts

This lesson is part of AI Agents & Workflow Automation. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Distinguish generated responses from systems that plan and use tools.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “From Chatbots to Agents”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Distinguish generated responses from systems that plan and use tools.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-ai-agents-workflow-automation-lesson-02', '# Tools, Instructions, and Structured Outputs

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Define constrained tool interfaces, schemas, and clear task boundaries.

## Core concepts

This lesson is part of AI Agents & Workflow Automation. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Define constrained tool interfaces, schemas, and clear task boundaries.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Tools, Instructions, and Structured Outputs”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Define constrained tool interfaces, schemas, and clear task boundaries.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-ai-agents-workflow-automation-lesson-03', '# Planning, State, and Memory

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Design task steps, explicit state, context handling, and recovery paths.

## Core concepts

This lesson is part of AI Agents & Workflow Automation. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Design task steps, explicit state, context handling, and recovery paths.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Planning, State, and Memory”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Design task steps, explicit state, context handling, and recovery paths.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-ai-agents-workflow-automation-lesson-04', '# Safe Tool Use and Human Approval

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Limit permissions and require confirmation for consequential actions.

## Core concepts

This lesson is part of AI Agents & Workflow Automation. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Limit permissions and require confirmation for consequential actions.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Safe Tool Use and Human Approval”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Limit permissions and require confirmation for consequential actions.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-ai-agents-workflow-automation-lesson-05', '# Build and Test an Automated Workflow

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Implement a bounded workflow and test failures, retries, and edge cases.

## Core concepts

This lesson is part of AI Agents & Workflow Automation. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Implement a bounded workflow and test failures, retries, and edge cases.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Build and Test an Automated Workflow”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Implement a bounded workflow and test failures, retries, and edge cases.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-ai-agents-workflow-automation-lesson-06', '# Agent Capstone and Evaluation

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Measure reliability, cost, latency, security, and successful task completion.

## Core concepts

This lesson is part of AI Agents & Workflow Automation. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Measure reliability, cost, latency, security, and successful task completion.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Agent Capstone and Evaluation”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Measure reliability, cost, latency, security, and successful task completion.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-hugging-face-llms-generative-ai-lesson-01', '# LLM Foundations and Tokenisation

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Understand tokens, context windows, model inputs, and generated outputs.

## Core concepts

This lesson is part of Large Language Models & Generative AI. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Understand tokens, context windows, model inputs, and generated outputs.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “LLM Foundations and Tokenisation”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Understand tokens, context windows, model inputs, and generated outputs.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-hugging-face-llms-generative-ai-lesson-02', '# Transformers and Attention

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Explain the role of attention and contextual representations.

## Core concepts

This lesson is part of Large Language Models & Generative AI. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Explain the role of attention and contextual representations.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Transformers and Attention”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Explain the role of attention and contextual representations.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-hugging-face-llms-generative-ai-lesson-03', '# Model Selection and Inference

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Compare model capabilities, deployment needs, latency, and cost.

## Core concepts

This lesson is part of Large Language Models & Generative AI. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Compare model capabilities, deployment needs, latency, and cost.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Model Selection and Inference”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Compare model capabilities, deployment needs, latency, and cost.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-hugging-face-llms-generative-ai-lesson-04', '# Hugging Face Models and Pipelines

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Explore model cards, tokenisers, pipelines, and reproducible configuration.

## Core concepts

This lesson is part of Large Language Models & Generative AI. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Explore model cards, tokenisers, pipelines, and reproducible configuration.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Hugging Face Models and Pipelines”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Explore model cards, tokenisers, pipelines, and reproducible configuration.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-hugging-face-llms-generative-ai-lesson-05', '# Retrieval-Augmented Generation

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Connect relevant documents to responses and assess grounding quality.

## Core concepts

This lesson is part of Large Language Models & Generative AI. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Connect relevant documents to responses and assess grounding quality.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Retrieval-Augmented Generation”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Connect relevant documents to responses and assess grounding quality.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-hugging-face-llms-generative-ai-lesson-06', '# Build and Evaluate an LLM Application

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Prototype a bounded application and evaluate factuality and failure modes.

## Core concepts

This lesson is part of Large Language Models & Generative AI. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Prototype a bounded application and evaluate factuality and failure modes.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Build and Evaluate an LLM Application”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Prototype a bounded application and evaluate factuality and failure modes.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-nvidia-generative-ai-llms-lesson-01', '# Generative AI Use Cases and Architecture

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Match generative approaches to a problem and define system boundaries.

## Core concepts

This lesson is part of Generative AI & LLM Applications. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Match generative approaches to a problem and define system boundaries.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Generative AI Use Cases and Architecture”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Match generative approaches to a problem and define system boundaries.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-nvidia-generative-ai-llms-lesson-02', '# Prompt Design and Output Constraints

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Specify context, examples, format, refusal conditions, and quality criteria.

## Core concepts

This lesson is part of Generative AI & LLM Applications. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Specify context, examples, format, refusal conditions, and quality criteria.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Prompt Design and Output Constraints”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Specify context, examples, format, refusal conditions, and quality criteria.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-nvidia-generative-ai-llms-lesson-03', '# Embeddings and Semantic Search

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Represent text as vectors and retrieve semantically relevant material.

## Core concepts

This lesson is part of Generative AI & LLM Applications. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Represent text as vectors and retrieve semantically relevant material.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Embeddings and Semantic Search”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Represent text as vectors and retrieve semantically relevant material.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-nvidia-generative-ai-llms-lesson-04', '# Grounded Question Answering

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Build a retrieval workflow and inspect evidence supporting each answer.

## Core concepts

This lesson is part of Generative AI & LLM Applications. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Build a retrieval workflow and inspect evidence supporting each answer.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Grounded Question Answering”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Build a retrieval workflow and inspect evidence supporting each answer.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-nvidia-generative-ai-llms-lesson-05', '# Performance, Cost, and Deployment

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Evaluate throughput, latency, resource needs, monitoring, and fallbacks.

## Core concepts

This lesson is part of Generative AI & LLM Applications. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Evaluate throughput, latency, resource needs, monitoring, and fallbacks.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Performance, Cost, and Deployment”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Evaluate throughput, latency, resource needs, monitoring, and fallbacks.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-nvidia-generative-ai-llms-lesson-06', '# Generative AI Application Capstone

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Deliver a tested prototype with documented risks and evaluation results.

## Core concepts

This lesson is part of Generative AI & LLM Applications. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Deliver a tested prototype with documented risks and evaluation results.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Generative AI Application Capstone”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Deliver a tested prototype with documented risks and evaluation results.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-applied-machine-learning-mlops-lesson-01', '# Frame a Machine Learning Problem

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Define the target, baseline, data requirements, and success metric.

## Core concepts

This lesson is part of Applied Machine Learning & MLOps. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Define the target, baseline, data requirements, and success metric.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Frame a Machine Learning Problem”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Define the target, baseline, data requirements, and success metric.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-applied-machine-learning-mlops-lesson-02', '# Prepare Data and Prevent Leakage

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Inspect missing values, splits, features, quality, and leakage risks.

## Core concepts

This lesson is part of Applied Machine Learning & MLOps. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Inspect missing values, splits, features, quality, and leakage risks.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Prepare Data and Prevent Leakage”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Inspect missing values, splits, features, quality, and leakage risks.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-applied-machine-learning-mlops-lesson-03', '# Train Baselines and Compare Models

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Create reproducible experiments and compare suitable algorithms.

## Core concepts

This lesson is part of Applied Machine Learning & MLOps. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Create reproducible experiments and compare suitable algorithms.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Train Baselines and Compare Models”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Create reproducible experiments and compare suitable algorithms.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-applied-machine-learning-mlops-lesson-04', '# Evaluate Models and Explain Errors

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Use appropriate metrics, validation, error analysis, and threshold selection.

## Core concepts

This lesson is part of Applied Machine Learning & MLOps. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Use appropriate metrics, validation, error analysis, and threshold selection.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Evaluate Models and Explain Errors”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Use appropriate metrics, validation, error analysis, and threshold selection.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-applied-machine-learning-mlops-lesson-05', '# Deploy and Monitor a Model

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Plan serving, versioning, drift monitoring, rollback, and ownership.

## Core concepts

This lesson is part of Applied Machine Learning & MLOps. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Plan serving, versioning, drift monitoring, rollback, and ownership.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “Deploy and Monitor a Model”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Plan serving, versioning, drift monitoring, rollback, and ownership.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null),
('sai-applied-machine-learning-mlops-lesson-06', '# End-to-End MLOps Capstone

## Learning objectives

By the end of this lesson, you should be able to explain and apply the following: Produce a reproducible pipeline with evaluation and operational documentation.

## Core concepts

This lesson is part of Applied Machine Learning & MLOps. Begin by defining the problem in your own words, identifying the inputs and expected outputs, and explaining why the technique matters in a real project.

Focus for this lesson: Produce a reproducible pipeline with evaluation and operational documentation.

Separate assumptions from verified facts. When using a tool, record its configuration and inspect the result rather than assuming that a successful run proves correctness.

## Guided practice

1. Write down the problem you want to solve using the concepts in “End-to-End MLOps Capstone”.
2. Break the task into small, testable steps.
3. Complete one small example and record the expected result before checking the actual result.
4. Test an edge case or failure scenario.
5. Explain what the result demonstrates and what it does not demonstrate.

## Practical assignment

Create a small portfolio artefact that demonstrates this lesson: Produce a reproducible pipeline with evaluation and operational documentation.
Include your goal, method, result, one limitation, and the next improvement you would make. Use synthetic or appropriately authorised data; do not publish secrets or personal information.

## Knowledge check

1. What problem does this lesson help you solve?
2. What evidence would show that your approach worked?
3. Identify one likely failure mode and explain how you would detect it.
4. What limitation should a responsible practitioner disclose?

## Completion evidence

Save your worked example, the result of your test, and a short reflection. Revisit any question you could not answer confidently before proceeding.', null)
on conflict (lesson_id) do nothing;
