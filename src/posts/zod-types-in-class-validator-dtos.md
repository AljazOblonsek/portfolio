---
title: 'Zod Types in Class Validator DTOs'
description: 'Exploring integration of Zod Types with Class Validator for DTO Validation.'
coverPath: '/zod-types-in-class-validator-dtos/cover.png'
date: '2024-03-01'
---

**Quick Link:** If you're here for the code, skip the backstory and <a href="#sectionimplementing-iszodtype-decorator">jump to the code section</a>.

## The Challenge

In my recent project, I faced a unique challenge while working with two different validation tools: `class-validator` and `zod`. My workflow involved using `class-validator` to validate DTOs received from POST requests, and then `zod` for additional schema parsing before sending the data to an external service.

The specific issue emerged with a DTO that utilized the `IsISO8601()` decorator from `class-validator`. This DTO was then re-validated using the `z.string().datetime()` function in `zod`. While `IsISO8601()` recognized `2020-07-10 15:00:00.000` as a valid ISO 8601 date, `z.string().datetime()` did not, resulting in an error during the secondary parsing process.

I had two choices: allow the DTO to pass through as a simple string or develop a custom decorator in class-validator that aligned with zod's datetime validation.

Intrigued, I delved into the zod source code and extracted the logic for `z.string().datetime()`. I then integrated this logic into a custom decorator for `class-validator` and applied it to the DTO class. Although this solution was effective, I had concerns about its long-term reliability, especially if zod's validation criteria were updated in the future. This led me to design a more adaptable solution—a custom decorator capable of accepting any zod schema or type for validation purposes.

Now, let's dive into how this solution works, complete with a code example. For context, I'll assume your project is already set up with TypeScript and experimental decorators enabled.

## Implementing IsZodType Decorator

First, install the necessary packages:

```bash
npm i class-validator@0.14.1 zod@3.22.4
```

Then, create `is-zod-type.ts` and add the following:

```ts
import { ZodType } from 'zod';
import { ValidateBy, ValidationOptions, ValidationArguments, buildMessage } from 'class-validator';

const IS_ZOD_TYPE = 'isZodType';

function isZodType(
  value: unknown,
  zodType: ZodType,
  validationArguments?: ValidationArguments
): boolean {
  const parseResult = zodType.safeParse(value);

  if (!parseResult.success) {
    validationArguments!.constraints[1] = parseResult.error.issues
      .map(
        (e) => `${e.path.join(' - ').trim() !== '' ? `${e.path.join(' - ')}: ` : ''}${e.message}`
      )
      .join(', ');
  }

  return parseResult.success;
}

export function IsZodType(zodType: ZodType, validationOptions?: ValidationOptions) {
  return ValidateBy(
    {
      name: IS_ZOD_TYPE,
      constraints: [zodType],
      validator: {
        validate: (value, args): boolean => isZodType(value, args?.constraints[0], args),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$constraint2',
          validationOptions
        ),
      },
    },
    validationOptions
  );
}
```

This code defines a constant and two functions, adhering to the `class-validator` pattern for creating validators. The `isZodType` function is responsible for the actual validation, employing `zodType.safeParse` to parse the value. Any parsing errors are captured for later use in constructing a detailed validation error message. The function ultimately returns the success status of the validation.

The `IsZodType` decorator, which we can apply in our DTO classes, invokes the `isZodType` validation function and also provides a mechanism for building an error message in case of parsing errors.

## Demonstrating the Problem and the Solution

Consider this example and try to identify where the error might occur:

```ts
import { z } from 'zod';
import { IsISO8601, IsString, validateSync } from 'class-validator';

const songSchema = z.object({
  title: z.string(),
  artist: z.string(),
  releaseTimestamp: z.string().datetime(),
});

class Song {
  @IsString()
  title!: string;

  @IsString()
  artist!: string;

  @IsISO8601()
  releaseTimestamp!: string;
}

const songFromClassValidator = new Song();
songFromClassValidator.title = 'Liar';
songFromClassValidator.artist = 'Yngwie Malmsteen';
songFromClassValidator.releaseTimestamp = '2020-07-10 15:00:00.000';
const classValidatorResult = validateSync(songFromClassValidator);

console.log('classValidatorResult => ', classValidatorResult);

const songFromZodSchema = songSchema.safeParse(songFromClassValidator);

console.log('zodParseResult => ', JSON.stringify(songFromZodSchema));
```

Running this code will produce the following output:

```bash
classValidatorResult =>  []
zodParseResult =>  {"success":false,"error":{"issues":[{"code":"invalid_string","validation":"datetime","message":"Invalid datetime","path":["releaseTimestamp"]}],"name":"ZodError"}}
```

The class validator accepts the `releaseTimestamp` string as a valid ISO8601 format, but `zod` does not. Let's modify the code to utilize our new decorator and resolve this discrepancy:

```ts
import { z } from 'zod';
import { IsString, validateSync } from 'class-validator';
import { IsZodType } from './is-zod-type';

const songSchema = z.object({
  title: z.string(),
  artist: z.string(),
  releaseTimestamp: z.string().datetime(),
});

class Song {
  @IsString()
  title!: string;

  @IsString()
  artist!: string;

  @IsZodType(songSchema.shape.releaseTimestamp)
  releaseTimestamp!: string;
}

const songFromClassValidator = new Song();
songFromClassValidator.title = 'Liar';
songFromClassValidator.artist = 'Yngwie Malmsteen';
songFromClassValidator.releaseTimestamp = '2020-07-10 15:00:00.000';
const classValidatorResult = validateSync(songFromClassValidator);

console.log('classValidatorResult => ', classValidatorResult);

const songFromZodSchema = songSchema.safeParse(songFromClassValidator);

console.log('zodParseResult => ', JSON.stringify(songFromZodSchema));
```

By using the `IsZodType` decorator and passing in the `releaseTimestamp` from our zod schema (`songSchema`), we can now achieve consistent validation results. The output should now reflect this:

```bash
classValidatorResult =>  [
  ValidationError {
    target: Song {
      title: 'Liar',
      artist: 'Yngwie Malmsteen',
      releaseTimestamp: '2020-07-10 15:00:00.000'
    },
    value: '2020-07-10 15:00:00.000',
    property: 'releaseTimestamp',
    children: [],
    constraints: { isZodType: 'Invalid datetime' }
  }
]
zodParseResult =>  {"success":false,"error":{"issues":[{"code":"invalid_string","validation":"datetime","message":"Invalid datetime","path":["releaseTimestamp"]}],"name":"ZodError"}}
```

That's it! We've successfully created a custom `class-validator` decorator that accepts zod schema types. This ensures that our DTOs are consistently validated, allowing for confident further processing with `zod`.

## Conclusion

This scenario might be uncommon, but exploring the capabilities of `class-validator` and `zod` has been both educational and enjoyable. It highlights the potential for cool solutions in specialized cases.

**References:**

- <a href="https://zod.dev/?id=iso-datetimes" target="_blank">Zod Documentation on ISO Datetimes</a>
- <a href="https://github.com/typestack/class-validator" target="_blank">Class Validator Source Code</a>
